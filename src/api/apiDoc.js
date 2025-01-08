const login = {
  request: {user_id: '', password: ''},
  response: {
    succuss: 'true/false',
    token: '',
    user: {
      userId: 'string/number',
      name: 'string',
      email: '',
      phoneNumber: '',
      address: '',
      latitude: '',
      longitude: '',
      documents: [
        {id: '', documentName: '', documentType: '', documentLink: ''},
      ],
      contract: [],
      balance: '',
    },
  },
};

const registration = {
  request: {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    latitude: '',
    longitude: '',
  },
  response: {
    succuss: 'true/false',
    token: '',
    user: {
      userId: 'string/number',
      name: 'string',
      email: '',
      phoneNumber: '',
      address: '',
      latitude: '',
      longitude: '',
      documents: [
        {id: '', documentName: '', documentType: '', documentLink: ''},
      ],
      contract: [],
      balance: '',
    },
  },
};
const currentPlan = {
  request: {
    headers: {token},
  },
  response: {
    succuss: 'true/false',
    planDetail: {
      id: '',
      planName: '',
      price: '',
      data: '',
      expireOn: 'date',
      uses: '',
      price: '',
      status: '',
    },
  },
};

const Banners = {
  request: {
    headers: {token},
  },
  response: {
    succuss: 'true/false',
    banners: [{id: '', image: '', description: ''}],
  },
};

const getAllPlans = {
  request: {
    params: 'limited/unlimited',
  },
  response: {
    succuss: 'true/false',
    plan: [{id: '', name: '', price: '', value: '', speed: '', otherOffer: ''}],
  },
};

const statics = {
  request: {
    to: '',
    from: '',
  },
  response: {
    succuss: 'true/false',
    data: {
      download: '',
      upload: '',
      statics: [{date: '', download: '', upload: ''}],
    },
  },
};

const Transaction = {
  request: {
    headers: {token},
  },
  response: {
    succuss: 'true/false',
    banners: [
      {
        id: '',
        plan: {
          id: '',
          name: '',
          price: '',
          value: '',
          speed: '',
          otherOffer: '',
        },
        date: '',
        status: '',
      },
    ],
  },
};

const Invoice = {
  request: {
    headers: {token},
  },
  response: {
    succuss: 'true/false',
    invoices: [
      {
        id: '',
        date: '',
        invoiceNumber: '',
        amount: '',
        invoiceLink: '',
        status: '',
      },
    ],
  },
};

const sendFeedback = {
  request: {
    ratingOfDesign: '',
    ratingOfFunctionality: '',
    Comments: '',
  },
  response: {
    succuss: 'true/false',
  },
};

const supportTicketHistory = {
  request: {
    headers: {token},
  },
  response: {
    succuss: 'true/false',
    tickets: [{id: '', date: '', ticketNumber: '', subject: '', message: ''}],
  },
};

const createTicket = {
  request: {
    subject: '',
    message: '',
  },
  response: {
    succuss: 'true/false',
    tickets: [{id: '', date: '', ticketNumber: '', subject: '', message: ''}],
  },
};

const FAQ = {
  request: {
    headers: {token},
  },
  response: {
    succuss: 'true/false',
    faq: [{question: '', answer: ''}],
  },
};

const ChangePlan = {
  request: {
    startDate: '',
    planId: '',
  },
  response: {
    succuss: 'true/false',
  },
};

const Notification = {
  request: {
    headers: {token},
  },
  response: {
    succuss: 'true/false',
    notification: [{datetime: '', title: '', description: ''}],
  },
};
