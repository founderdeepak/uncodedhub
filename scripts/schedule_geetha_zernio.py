import os
import zipfile
import csv
from datetime import datetime, timedelta

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\geetha_120_instagram_campaign"
zips_dir = os.path.join(base_dir, "30 day instagram facebook posts - geetha")
images_dir = os.path.join(base_dir, "images")
os.makedirs(images_dir, exist_ok=True)

start_date = datetime(2026, 10, 15)
profile_id = "6acfe254f81d871046ad8434"

slots = [
    ("10AM - Geetha.zip", "10:00", "10AM_Typography", "01_slot_10am_editorial_typography_30.csv", "10:00 AM // TYPOGRAPHY PROTOCOL"),
    ("2PM - Geetha.zip", "14:00", "02PM_QuietLuxury", "02_slot_02pm_quiet_luxury_psychology_30.csv", "QUIET LUXURY // 02:00 PM"),
    ("6PM - Geetha.zip", "18:00", "06PM_HeroMasterclass", "03_slot_06pm_hero_section_masterclass_30.csv", "HERO MASTERCLASS // 06:00 PM"),
    ("10PM - Geetha.zip", "22:00", "10PM_ConversionArch", "04_slot_10pm_conversion_architecture_30.csv", "CONVERSION ARCHITECTURE // 10:00 PM"),
]

# 1. Unzip and rename all 120 images
print("--- 1. Extracting and Renaming Geetha's Images ---")
extracted_count = 0
for zip_name, slot_time, prefix, _, _ in slots:
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

print(f"Total Geetha images extracted & mapped: {extracted_count} / 120")

# 2. Rename old slot 4 CSV if it exists
old_slot4 = os.path.join(base_dir, "04_slot_08pm_conversion_architecture_30.csv")
new_slot4 = os.path.join(base_dir, "04_slot_10pm_conversion_architecture_30.csv")
if os.path.exists(old_slot4) and not os.path.exists(new_slot4):
    os.rename(old_slot4, new_slot4)
    print(f"Renamed {old_slot4} to {new_slot4}")

# Update slot 4 CSV time and pill to 10:00 PM / 22:00
if os.path.exists(new_slot4):
    with open(new_slot4, "r", encoding="utf-8-sig") as f:
        reader = list(csv.reader(f))
    headers = reader[0]
    updated_rows = [headers]
    for i, row in enumerate(reader[1:], 0):
        dt = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        row[1] = dt
        row[2] = "22:00"
        row[3] = "CONVERSION ARCHITECTURE // 10:00 PM"
        updated_rows.append(row)
    with open(new_slot4, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerows(updated_rows)
    print("Updated 04_slot_10pm_conversion_architecture_30.csv to 22:00 / 10:00 PM")

# Also ensure slot 1, 2, 3 have dates starting 2026-10-15
for _, slot_time, _, csv_name, pill_text in slots[:3]:
    csv_path = os.path.join(base_dir, csv_name)
    if os.path.exists(csv_path):
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = list(csv.reader(f))
        headers = reader[0]
        updated_rows = [headers]
        for i, row in enumerate(reader[1:], 0):
            dt = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
            row[1] = dt
            row[2] = slot_time
            row[3] = pill_text
            updated_rows.append(row)
        with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.writer(f)
            writer.writerows(updated_rows)
        print(f"Synced dates in {csv_name}")

# 3. Rebuild master_geetha_120_zernio_schedule.csv
print("\n--- 3. Rebuilding Master Geetha Zernio Schedule ---")
zernio_template = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\deepak_180_instagram_campaign\master_deepak_180_zernio_schedule.csv"
with open(zernio_template, "r", encoding="utf-8-sig") as f:
    headers = next(csv.reader(f))

slot1_file = os.path.join(base_dir, "01_slot_10am_editorial_typography_30.csv")
slot2_file = os.path.join(base_dir, "02_slot_02pm_quiet_luxury_psychology_30.csv")
slot3_file = os.path.join(base_dir, "03_slot_06pm_hero_section_masterclass_30.csv")
slot4_file = new_slot4

with open(slot1_file, "r", encoding="utf-8-sig") as f: s1_data = list(csv.DictReader(f))
with open(slot2_file, "r", encoding="utf-8-sig") as f: s2_data = list(csv.DictReader(f))
with open(slot3_file, "r", encoding="utf-8-sig") as f: s3_data = list(csv.DictReader(f))
with open(slot4_file, "r", encoding="utf-8-sig") as f: s4_data = list(csv.DictReader(f))

zernio_rows = []

for i in range(30):
    day_num = i + 1
    
    # Slot 1: 10:00 AM Typography
    r1 = s1_data[i]
    c1 = f"[{r1['Slot_Pill']}]\n\n{r1['Rule_Header']}: {r1['Core_Headline']}\n\n{r1['Diagnostic_Body']}\n\nGolden Takeaway:\n{r1['Golden_Takeaway']}\n\n#TypographyDesign #VisualHierarchy #EditorialDesign #LuxuryBranding #UncodedHub"
    time1 = f"{r1['Date']} 10:00"
    img1 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_10AM_Typography.png"
    row1 = ["" for _ in headers]
    row1[0], row1[1], row1[2], row1[3], row1[16], row1[17] = c1, "instagram,facebook", profile_id, time1, "Asia/Kolkata", img1
    zernio_rows.append(row1)

    # Slot 2: 14:00 (02:00 PM) Quiet Luxury
    r2 = s2_data[i]
    c2 = f"[{r2['Slot_Pill']}]\n\n{r2['Concept_Title']}\n\nCore Principle:\n{r2['Core_Principle']}\n\nPsychological Insight:\n{r2['Psychological_Insight']}\n\nApplication for Founders:\n{r2['Application_For_Founders']}\n\n#QuietLuxury #DesignPsychology #HighTicketBranding #MinimalistAesthetics #UncodedHub"
    time2 = f"{r2['Date']} 14:00"
    img2 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_02PM_QuietLuxury.png"
    row2 = ["" for _ in headers]
    row2[0], row2[1], row2[2], row2[3], row2[16], row2[17] = c2, "instagram,facebook", profile_id, time2, "Asia/Kolkata", img2
    zernio_rows.append(row2)

    # Slot 3: 18:00 (06:00 PM) Hero Masterclass
    r3 = s3_data[i]
    c3 = f"[{r3['Slot_Pill']}]\n\n{r3['Archetype_Name']}\n\nLayout Geometry:\n{r3['Layout_Geometry']}\n\nFirst-Fold Rule:\n{r3['First_Fold_Rule']}\n\nBest Suited For:\n{r3['Ideal_For_Niche']}\n\n#HeroSection #WebDesignInspiration #UIUXDesign #DesignMasterclass #UncodedHub"
    time3 = f"{r3['Date']} 18:00"
    img3 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_06PM_HeroMasterclass.png"
    row3 = ["" for _ in headers]
    row3[0], row3[1], row3[2], row3[3], row3[16], row3[17] = c3, "instagram,facebook", profile_id, time3, "Asia/Kolkata", img3
    zernio_rows.append(row3)

    # Slot 4: 22:00 (10:00 PM) Conversion Architecture
    r4 = s4_data[i]
    c4 = f"[{r4['Slot_Pill']}]\n\n{r4['Framework_Name']}\n\nStrategic Objective:\n{r4['Strategic_Objective']}\n\nArchitectural Execution:\n{r4['Architectural_Execution']}\n\nAction Step:\n{r4['Action_Step_CTA']}\n\n#ConversionDesign #HighTicketSales #UXArchitecture #ClientAcquisition #GeethaDesigns"
    time4 = f"{r4['Date']} 22:00"
    img4 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_10PM_ConversionArch.png"
    row4 = ["" for _ in headers]
    row4[0], row4[1], row4[2], row4[3], row4[16], row4[17] = c4, "instagram,facebook", profile_id, time4, "Asia/Kolkata", img4
    zernio_rows.append(row4)

master_file = os.path.join(base_dir, "master_geetha_120_zernio_schedule.csv")
with open(master_file, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for r in zernio_rows:
        writer.writerow(r)

print(f"Successfully generated master Geetha Zernio schedule with {len(zernio_rows)} rows at {master_file}!")
print(f"First post: {zernio_rows[0][3]} | Profile: {zernio_rows[0][2]}")
print(f"Last post:  {zernio_rows[-1][3]} | Profile: {zernio_rows[-1][2]}")
