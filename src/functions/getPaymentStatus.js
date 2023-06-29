export const getPaymentStatus = async (invoice) => {
    //  const url = process.env.REACT_APP_API_URL_STATUS;
     const url = "https://lightning-store.onrender.com/status";
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          invoice: invoice
      }),
    });
    const data = await res.json();
    return data.status
  }
