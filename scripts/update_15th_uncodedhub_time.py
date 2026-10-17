import csv

file_path = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\uncodedhub_180_instagram_campaign\master_uncodedhub_180_zernio_schedule.csv"

with open(file_path, "r", encoding="utf-8-sig") as f:
    rows = list(csv.reader(f))

headers = rows[0]
time_idx = headers.index("schedule_time")

print(f"Before Row 1: {rows[1][time_idx]}")
print(f"Before Row 2: {rows[2][time_idx]}")

# Update Row 1 and Row 2 to 2026-10-15 12:00
rows[1][time_idx] = "2026-10-15 12:00"
rows[2][time_idx] = "2026-10-15 12:00"

print(f"After Row 1: {rows[1][time_idx]}")
print(f"After Row 2: {rows[2][time_idx]}")
print(f"Row 3: {rows[3][time_idx]}")
print(f"Row 4: {rows[4][time_idx]}")
print(f"Row 5: {rows[5][time_idx]}")
print(f"Row 6: {rows[6][time_idx]}")
print(f"Row 7 (16th): {rows[7][time_idx]}")

with open(file_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

print("Successfully updated master CSV!")
