
export const getInvoice = async (amt, msg) => {

    // const url = process.env.REACT_APP_API_URL_INVOICE;
    const url = "https://lightning-store.onrender.com/newinvoice";
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amt,
        msg: msg,
      }),
    });
  
    const data = await res.json();
  
    return data.invoice
  
  }
