# Super Website Features — Raw Specification

> Extracted verbatim from client requirement document / brief.

---

I need to turn this site into something that captures and books customers. Please build all of the following. I have numbered them.

1. **MESSAGING**: Add a contact form and a chat widget. Both should feed into one shared inbox where each conversation has a status of unresolved, waiting on customer, or resolved.

2. **BOOKING PAGE**: Add a page called "Book a Free In-Home Estimate". The visitor picks which project they want quoted (kitchen, bathroom, basement, or home addition), picks a date and a time slot, and enters their name, phone, email, and the address of the property. Available slots are Monday to Friday, 8am to 4pm, in one hour blocks, with a one hour buffer after each appointment for travel. On submit: confirm on screen, save to the database, and let them add it to their own Google, Outlook or Apple calendar in one tap. Confirmation message should read: *"You're booked. Add it to your calendar below so you don't forget, and we'll call the day before to confirm."*

3. **ESTIMATOR PAGE**: Add a page called "Estimate Your Project". Three steps, one question per screen, with a progress indicator and a back button.
   - **Step 1**: project type. Kitchen, bathroom, basement, or home addition.
   - **Step 2**: size. Small, medium, or large, each with a short plain-English description so a homeowner knows which one they are.
   - **Step 3**: finish level. Standard, mid-range, or high end.

4. **ESTIMATOR PRICING**: Use exactly these ranges and do not change them:
   - **Kitchen**: Small $25,000–$40,000 | Medium $40,000–$70,000 | Large $70,000–$120,000
   - **Bathroom**: Small $12,000–$20,000 | Medium $20,000–$35,000 | Large $35,000–$60,000
   - **Basement**: Small $20,000–$35,000 | Medium $35,000–$55,000 | Large $55,000–$90,000
   - **Addition**: Small $60,000–$100,000 | Medium $100,000–$180,000 | Large $180,000–$300,000
   - *Adjustment logic*: Add 15% to both ends of the range for high end finish. Subtract 10% for standard.
   - *Disclaimer under the number*: *"This is a planning range based on jobs we have completed in the Rochester area. Your exact price depends on layout, materials and site conditions."*

5. **ESTIMATOR CAPTURE**: Ask for name, email and phone before revealing the range. Save every submission to the database with all their answers and send it to the inbox. After the range is shown, offer a button to book a free in-home estimate that links to the booking page.

6. **NOTIFICATIONS**: When somebody submits the estimator, books an appointment, or sends a message through the form or chat, email me immediately at `[owner email]` with all of their answers. Also send the customer an automatic reply confirming we received it, saying we will call within one business day, and including our phone number.

7. **DEPOSIT**: Connect the booking system to Stripe and take a 250 dollar deposit at the time of booking. Make it fully refundable if they cancel more than 24 hours before, and say so clearly on the booking page before they pay.

8. **ADMIN**: Add a staff login at the bottom of the site leading to a dashboard showing bookings, cancellations, services, clients and staff.

9. **SEO**: Analyze SEO for the whole site and implement it. Unique titles and meta descriptions per page, canonical URLs, open graph and Twitter card metadata, structured data, and update the sitemap so every public route is discoverable.
