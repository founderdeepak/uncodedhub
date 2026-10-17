import os
import csv
from datetime import datetime, timedelta

output_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\geetha_120_instagram_campaign"
zernio_template = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\deepak_180_instagram_campaign\master_deepak_180_zernio_schedule.csv"

# Read header from template
with open(zernio_template, "r", encoding="utf-8-sig") as f:
    reader = csv.reader(f)
    headers = next(reader)

# Read 4 slot CSVs
slot_files = [
    os.path.join(output_dir, "01_slot_10am_editorial_typography_30.csv"),
    os.path.join(output_dir, "02_slot_02pm_visual_teardown_30.csv"),
    os.path.join(output_dir, "03_slot_06pm_luxury_palette_spatial_30.csv"),
    os.path.join(output_dir, "04_slot_08pm_mckinsey_design_notes_30.csv"),
]

slots_data = []
for sf in slot_files:
    with open(sf, "r", encoding="utf-8-sig") as f:
        reader = list(csv.DictReader(f))
        slots_data.append(reader)

profile_id = "6ac91e8c0b80c7bfcba45e7a"
rows = []

# Generate all 30 days x 4 posts = 120 posts sorted chronologically
for day_idx in range(30):
    day_num = day_idx + 1
    
    # Slot 1: 10:00 AM
    s1 = slots_data[0][day_idx]
    c1 = f"[{s1['Slot_Pill']}]\n\n{s1['Rule_Header']}: {s1['Core_Headline']}\n\n{s1['Diagnostic_Body']}\n\nGolden Takeaway:\n{s1['Golden_Takeaway']}\n\n#TypographyDesign #VisualHierarchy #EditorialDesign #LuxuryBranding #UncodedHub"
    time1 = f"{s1['Date']} 10:00"
    img1 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_10AM_Typography.png"
    
    row1 = ["" for _ in headers]
    row1[0] = c1
    row1[1] = "instagram,facebook"
    row1[2] = profile_id
    row1[3] = time1
    row1[16] = "Asia/Kolkata"
    row1[17] = img1
    rows.append(row1)

    # Slot 2: 14:00 (02:00 PM)
    s2 = slots_data[1][day_idx]
    c2 = f"[{s2['Slot_Pill']}]\n\n{s2['Niche_Target']}\n\n❌ Commodity Mistake:\n{s2['Commodity_Mistake']}\n\n✨ Luxury Standard:\n{s2['Luxury_Standard']}\n\nPricing Impact:\n{s2['Pricing_Impact']}\n\n#DesignTeardown #HighTicketDesign #LuxuryRestraint #WebDesignAudit #UncodedHub"
    time2 = f"{s2['Date']} 14:00"
    img2 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_02PM_Teardown.png"
    
    row2 = ["" for _ in headers]
    row2[0] = c2
    row2[1] = "instagram,facebook"
    row2[2] = profile_id
    row2[3] = time2
    row2[16] = "Asia/Kolkata"
    row2[17] = img2
    rows.append(row2)

    # Slot 3: 18:00 (06:00 PM)
    s3 = slots_data[2][day_idx]
    c3 = f"[{s3['Slot_Pill']}]\n\n{s3['Palette_Name']}\n\nColor Tokens:\n{s3['Color_Hex_Codes']}\n\nSpatial Distribution:\n{s3['Spatial_Ratio']}\n\nPsychological Effect:\n{s3['Psychological_Effect']}\n\nRecommended For:\n{s3['Best_For_Niche']}\n\n#ColorPalette #LuxuryAesthetics #DesignSystem #SpatialDesign #BrandIdentity"
    time3 = f"{s3['Date']} 18:00"
    img3 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_06PM_Palette.png"
    
    row3 = ["" for _ in headers]
    row3[0] = c3
    row3[1] = "instagram,facebook"
    row3[2] = profile_id
    row3[3] = time3
    row3[16] = "Asia/Kolkata"
    row3[17] = img3
    rows.append(row3)

    # Slot 4: 20:00 (08:00 PM)
    s4 = slots_data[3][day_idx]
    c4 = f"[{s4['Slot_Pill']}]\n\n{s4['Boardroom_Insight']}\n\nExecutive Reality:\n{s4['Executive_Reality']}\n\nThe Strategic Fix:\n{s4['The_Fix']}\n\nAction Step:\n{s4['Hand_Raiser_CTA']}\n\n#McKinsey #ExecutivePresentation #ClientAcquisition #HighTicketSales #GeethaDesigns"
    time4 = f"{s4['Date']} 20:00"
    img4 = f"https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/geetha_120_instagram_campaign/images/Day{day_num:02d}_08PM_BoardroomNotes.png"
    
    row4 = ["" for _ in headers]
    row4[0] = c4
    row4[1] = "instagram,facebook"
    row4[2] = profile_id
    row4[3] = time4
    row4[16] = "Asia/Kolkata"
    row4[17] = img4
    rows.append(row4)

master_file = os.path.join(output_dir, "master_geetha_120_zernio_schedule.csv")
with open(master_file, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for r in rows:
        writer.writerow(r)

print(f"Successfully generated master Zernio schedule with {len(rows)} posts at {master_file}!")
