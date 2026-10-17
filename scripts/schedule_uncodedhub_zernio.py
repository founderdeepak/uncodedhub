import os
import zipfile
import csv
from datetime import datetime, timedelta

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\uncodedhub_180_instagram_campaign"
zips_dir = os.path.join(base_dir, "30 day instagram facebook posts - uncodedhub")
images_dir = os.path.join(base_dir, "images")
os.makedirs(images_dir, exist_ok=True)

start_date = datetime(2026, 10, 15)
profile_id = "6acfb8ce887284d03189ee8d"

# Slot configurations: (zip_file_name, slot_time, slot_name_prefix, csv_filename)
slots = [
    ("8AM - uncodedhub.zip", "08:00", "08AM_TelemetryAudit", "01_slot_08am_telemetry_audit_30.csv"),
    ("11AM - uncodedhub.zip", "11:00", "11AM_ArchitectureTeardown", "02_slot_11am_architecture_teardown_30.csv"),
    ("2PM - uncodedhub.zip", "14:00", "02PM_StudioStandard", "03_slot_02pm_5point_standards_30.csv"),
    ("5PM - uncodedhub.zip", "17:00", "05PM_SprintProtocol", "04_slot_05pm_sprint_protocol_30.csv"),
    ("8PM - uncodedhub.zip", "20:00", "08PM_StudioManifesto", "05_slot_08pm_studio_manifesto_30.csv"),
    ("11PM - uncodedhub.zip", "23:00", "11PM_DeployChangelog", "06_slot_11pm_deploy_changelog_30.csv"),
]

# 1. Unzip and rename images for all 30 days
print("--- 1. Extracting and Renaming Images ---")
extracted_count = 0
for zip_name, slot_time, prefix, _ in slots:
    zip_path = os.path.join(zips_dir, zip_name)
    if not os.path.exists(zip_path):
        print(f"Warning: Zip not found: {zip_path}")
        continue
    
    with zipfile.ZipFile(zip_path, 'r') as z:
        namelist = z.namelist()
        for day in range(1, 31):
            target_img_name = f"{day}.png"
            dest_name = f"Day{day:02d}_{prefix}.png"
            dest_path = os.path.join(images_dir, dest_name)
            
            # Find matching file in zip (handle case sensitivity or subfolders if any)
            matched_file = None
            for item in namelist:
                basename = os.path.basename(item)
                if basename.lower() == target_img_name.lower():
                    matched_file = item
                    break
            
            if matched_file:
                with z.open(matched_file) as source, open(dest_path, "wb") as target:
                    target.write(source.read())
                extracted_count += 1
            else:
                print(f"Missing {target_img_name} in {zip_name}")

print(f"Total images extracted & mapped: {extracted_count} / 180")

# 2. Update individual 6 slot CSV dates (starting 2026-10-15)
print("\n--- 2. Updating Individual Slot CSV Dates ---")
for _, _, _, csv_name in slots:
    csv_path = os.path.join(base_dir, csv_name)
    if not os.path.exists(csv_path):
        print(f"Warning: CSV not found: {csv_path}")
        continue
    
    with open(csv_path, "r", encoding="utf-8-sig") as f:
        reader = list(csv.reader(f))
    
    headers = reader[0]
    date_col_idx = headers.index("Date") if "Date" in headers else 1
    
    updated_rows = [headers]
    for i, row in enumerate(reader[1:], 0):
        dt = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        row[date_col_idx] = dt
        updated_rows.append(row)
        
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerows(updated_rows)
    print(f"Updated dates in {csv_name} (Days 1-30 -> 2026-10-15 to 2026-11-13)")

# 3. Rebuild master_uncodedhub_180_zernio_schedule.csv
print("\n--- 3. Rebuilding Master Zernio Schedule CSV ---")
master_file = os.path.join(base_dir, "master_uncodedhub_180_zernio_schedule.csv")

# Read existing master to preserve captions, hashtags, and formatting
with open(master_file, "r", encoding="utf-8-sig") as f:
    master_rows = list(csv.reader(f))

headers = master_rows[0]
# Expected indices:
# 0: post_content
# 1: platforms
# 2: profiles
# 3: schedule_time
# 16: tz
# 17: media_urls

post_rows = master_rows[1:]
if len(post_rows) != 180:
    print(f"Warning: Expected 180 rows, found {len(post_rows)}")

new_post_rows = []
for i, row in enumerate(post_rows):
    day_idx = i // 6  # 0 to 29
    slot_idx = i % 6  # 0 to 5
    day_num = day_idx + 1
    
    dt_str = (start_date + timedelta(days=day_idx)).strftime("%Y-%m-%d")
    slot_time = slots[slot_idx][1]
    schedule_time_str = f"{dt_str} {slot_time}"
    
    prefix = slots[slot_idx][2]
    media_url = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/uncodedhub_180_instagram_campaign/images/Day{day_num:02d}_{prefix}.png"
    
    # Update profile, schedule time, and media_url
    row[1] = "instagram,facebook"
    row[2] = profile_id
    row[3] = schedule_time_str
    row[16] = "Asia/Kolkata"
    row[17] = media_url
    new_post_rows.append(row)

with open(master_file, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(new_post_rows)

print(f"Successfully generated updated master Zernio schedule at {master_file}!")
print(f"First post: {new_post_rows[0][3]} | Profile: {new_post_rows[0][2]}")
print(f"Last post:  {new_post_rows[-1][3]} | Profile: {new_post_rows[-1][2]}")
