import { chromium } from 'playwright';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { NICHES_VIDEO_CONFIG } from './niche_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const outputDir = path.join(projectRoot, 'video_production', 'dist');
const tempDir = path.join(projectRoot, 'video_production', 'temp');
const audioTrack = path.join(projectRoot, 'tools', 'remotion', 'packages', 'template-recorder', 'public', 'sounds', 'utope-rhythmic-reverie.mp3');

// Ensure output folders exist
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

async function renderVideoItem({ type, key, durationSeconds, title }) {
  console.log(`\n============================================================`);
  console.log(`🎬 RENDERING VIDEO: ${title} (${durationSeconds}s)`);
  console.log(`============================================================`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--hide-scrollbars', '--disable-gpu']
  });

  const sessionDir = path.join(tempDir, `session_${Date.now()}`);
  fs.mkdirSync(sessionDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: sessionDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  
  // Build URL
  let fileUrl = '';
  if (type === 'master') {
    fileUrl = 'file:///' + path.join(__dirname, 'master_intro.html').replace(/\\/g, '/');
  } else {
    fileUrl = 'file:///' + path.join(__dirname, 'niche_player.html').replace(/\\/g, '/') + `?niche=${key}`;
  }

  console.log(`Loading stage: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Trigger playback
  await page.evaluate(() => {
    if (window.startPlay) window.startPlay();
  });

  console.log(`Recording playback for ${durationSeconds} seconds...`);
  const recordMs = (durationSeconds + 1) * 1000;
  await page.waitForTimeout(recordMs);

  // Close context to flush video to disk
  await context.close();
  await browser.close();

  // Find recorded WebM
  const webmFiles = fs.readdirSync(sessionDir).filter(f => f.endsWith('.webm'));
  if (webmFiles.length === 0) {
    throw new Error(`Failed to capture video in ${sessionDir}`);
  }
  const rawWebmPath = path.join(sessionDir, webmFiles[0]);
  const outFileName = type === 'master' ? '00_uncodedhub_master_intro_1080p.mp4' : `niche_${key}_showcase_1080p.mp4`;
  const finalMp4Path = path.join(outputDir, outFileName);

  console.log(`Converting & Muxing with background score via FFmpeg...`);
  
  let ffmpegCmd = '';
  if (fs.existsSync(audioTrack)) {
    // Loop audio track to match video length with smooth fadeout
    ffmpegCmd = `ffmpeg -y -i "${rawWebmPath}" -stream_loop -1 -i "${audioTrack}" -t ${durationSeconds} -filter_complex "[1:a]volume=0.25,afade=t=out:st=${durationSeconds - 2}:d=2[a]" -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -map 0:v -map "[a]" -shortest "${finalMp4Path}"`;
  } else {
    ffmpegCmd = `ffmpeg -y -i "${rawWebmPath}" -t ${durationSeconds} -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "${finalMp4Path}"`;
  }

  try {
    execSync(ffmpegCmd, { stdio: 'inherit' });
    console.log(`[OK] Rendered pristine MP4: ${finalMp4Path}`);
  } catch (err) {
    console.error(`FFmpeg encoding error:`, err);
  } finally {
    // Clean up temporary session folder
    try {
      fs.rmSync(sessionDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--test')) {
    // Test render: Educational Academy (60s)
    const testItem = NICHES_VIDEO_CONFIG.find(n => n.key === 'educational-academy');
    await renderVideoItem({
      type: 'niche',
      key: testItem.key,
      durationSeconds: 60,
      title: testItem.nicheName
    });
    return;
  }

  if (args.includes('--master')) {
    await renderVideoItem({
      type: 'master',
      durationSeconds: 120,
      title: 'Uncoded Hub Master Introduction Video'
    });
    return;
  }

  const nicheIdx = args.indexOf('--niche');
  if (nicheIdx !== -1 && args[nicheIdx + 1]) {
    const targetKey = args[nicheIdx + 1];
    const item = NICHES_VIDEO_CONFIG.find(n => n.key === targetKey);
    if (!item) {
      console.error(`Niche key "${targetKey}" not found!`);
      process.exit(1);
    }
    await renderVideoItem({
      type: 'niche',
      key: item.key,
      durationSeconds: 60,
      title: item.nicheName
    });
    return;
  }

  if (args.includes('--all')) {
    // Render Master first
    await renderVideoItem({
      type: 'master',
      durationSeconds: 120,
      title: 'Uncoded Hub Master Introduction Video'
    });

    // Render all 17 niches
    for (const item of NICHES_VIDEO_CONFIG) {
      await renderVideoItem({
        type: 'niche',
        key: item.key,
        durationSeconds: 60,
        title: item.nicheName
      });
    }
    console.log('\n🎉 ALL 18 BROADCAST VIDEOS SUCCESSFULLY RENDERED TO video_production/dist/!');
    return;
  }

  console.log(`
Uncoded Hub Video Production Engine
Usage:
  node video_production/render_all.mjs --test             (Test render 1 niche video)
  node video_production/render_all.mjs --master           (Render 2-minute master intro)
  node video_production/render_all.mjs --niche <key>      (Render specific niche)
  node video_production/render_all.mjs --all              (Render all 18 videos)

Preview interactively in browser:
  Open video_production/index.html in your browser!
  `);
}

main().catch(console.error);
