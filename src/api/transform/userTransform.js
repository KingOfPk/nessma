export const transformUserResponse = response => {
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    phone: response.phone,
    userId: response.login,
    partnerId: response.partner_id,
    status: response.status,
    street_1: response.street_1,
    street_2: response.street_2,
    zipCode: response.zip_code,
    city: response.city,
    billingType: response.billing_type,
  };
};
