import os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

NICHES_LIST = [
    ("01", "Educational Academies & Coaching Institutes", "educational-academy"),
    ("02", "Commercial Gyms & Fitness Clubs", "gym-fitness-club"),
    ("03", "Interior Designers & Architects", "interior-designers"),
    ("04", "Real Estate & Property Consultants", "real-estate"),
    ("05", "Dental & Aesthetic Clinics", "dental-clinics"),
    ("06", "Wedding Photographers & Event Planners", "wedding-photographers"),
    ("07", "Home Renovation & Modular Kitchens", "home-renovation"),
    ("08", "Coaches & Business Consultants", "coaches-consultants"),
    ("09", "Enterprise B2B & Corporate Advisory", "business-portfolio"),
    ("10", "Luxury Spas & Wellness Retreats", "spa-wellness"),
    ("11", "Bridal Salons & Luxury Beauty", "salon-beauty"),
    ("12", "Private Fitness Coaches & Trainers", "fitness-coach"),
    ("13", "Traditional Yoga Shalas & Meditation", "yoga-meditation"),
    ("14", "Creative Studios & Design Agencies", "creative-portfolio"),
    ("15", "Pathology Labs & Diagnostic Centers", "healthcare-diagnostics"),
    ("16", "Multi-Specialty Polyclinics", "clinic-polyclinic"),
    ("17", "Super-Specialist Doctors & Surgeons", "doctor-specialist"),
]

print(f"Total niches: {len(NICHES_LIST)}")
for idx, title, key in NICHES_LIST:
    print(f"{idx}. {title} ({key})")
