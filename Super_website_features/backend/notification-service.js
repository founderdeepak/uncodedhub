/**
 * UNCODED HUB — UNIVERSAL NOTIFICATION SERVICE
 * Multi-Tenant WhatsApp Cloud API & Transactional Email Gateway
 * Automatically dispatches alerts to business owners and reassures prospects.
 */

class NotificationService {
  /**
   * Dispatches instant alert to business owner when a lead is captured
   */
  static async dispatchLeadToOwner(lead, tenant) {
    const ownerPhone = tenant.owner_phone || '+919800000000';
    const ownerEmail = tenant.owner_email || 'owner@studio.com';

    const whatsappMessage = [
      `⚡ *NEW QUALIFIED LEAD: ${tenant.name.toUpperCase()}*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${lead.name}`,
      `📞 *Phone:* ${lead.phone}`,
      `✉️ *Email:* ${lead.email}`,
      `📍 *Location:* ${lead.address || 'Not specified'}`,
      `🏷️ *Scope:* ${lead.project_type} (${lead.project_size})`,
      `💎 *Finish:* ${lead.finish_level}`,
      `💰 *Estimated Value:* ₹${(lead.estimated_min/100000).toFixed(1)}L - ₹${(lead.estimated_max/100000).toFixed(1)}L`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `⚡ *Quick Action:* Tap phone number above to call or message immediately.`
    ].join('\n');

    console.log(`[WHATSAPP DISPATCH] Sending to ${ownerPhone} for tenant ${tenant.slug}`);
    console.log(whatsappMessage);

    // In production:
    // await this.sendWhatsAppCloudApi(ownerPhone, whatsappMessage);
    // await this.sendResendEmail(ownerEmail, `New Lead: ${lead.name}`, whatsappMessage);

    return { success: true, dispatched_to: ownerPhone };
  }

  /**
   * Dispatches instant reassurance to customer confirming callback SLA
   */
  static async dispatchReassuranceToCustomer(lead, tenant) {
    const customerPhone = lead.phone;
    const slaHours = tenant.sla_hours || 24;

    const customerMessage = [
      `Hi ${lead.name}, thank you for requesting an estimate from ${tenant.name}!`,
      `\nOur team is reviewing your specifications for ${lead.project_type}. We will contact you within ${slaHours} business hours from ${tenant.owner_phone} to discuss your project.\n`,
      `Best regards,\n${tenant.name}`
    ].join('\n');

    console.log(`[CUSTOMER REASSURANCE] Sending to ${customerPhone}`);
    // In production:
    // await this.sendWhatsAppCloudApi(customerPhone, customerMessage);

    return { success: true, dispatched_to: customerPhone };
  }

  /**
   * Production WhatsApp Cloud API Connector (Meta Graph API)
   */
  static async sendWhatsAppCloudApi(toPhoneNumber, messageBody) {
    const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!token || !phoneId) {
      console.warn('WhatsApp Cloud API credentials not configured in environment.');
      return false;
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: toPhoneNumber.replace(/[^0-9]/g, ''),
          type: 'text',
          text: { body: messageBody }
        })
      });
      return await response.json();
    } catch (err) {
      console.error('WhatsApp dispatch error:', err);
      return false;
    }
  }
}

module.exports = NotificationService;
