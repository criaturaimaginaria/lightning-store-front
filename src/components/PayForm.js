import React, { useEffect, useState } from "react";
import { getInvoice } from "../functions/getInvoice";
import { getPaymentStatus } from "../functions/getPaymentStatus";
import { items } from "../functions/itemsData";
import QRcode from "qrcode.react";
import LN from '../images/LN.png';
import BTC from '../images/btc.png';

const PayForm = (props) => {
  const [invoice, setInvoice] = useState("");
  const [bitcoinPrice, setBitcoinPrice] = useState();
  const [priceInSats, setPiceInSats] = useState();
  const [priceInBtc, setPriceInBtc] = useState();
  const [showQr, setShowQr] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showPdfLink, setShowPdfLink] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [BtcSat, setBtcSat] = useState(true);

  const [backendDate, setBackendData] = useState();

  const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setBitcoinPrice(data?.bpi?.USD.rate_float);
      });

    const usdToSat = () => {
      let sat1 = bitcoinPrice / 100000000;
      let dollar = props?.amount;
      let total = dollar / sat1;
      total = total.toFixed(8);
      setPiceInSats(Math.trunc(total));
      return Math.trunc(total);
    };
    usdToSat();
    const usdToBtc = () => {
      let dollar = (props?.amount);
      let total = dollar / bitcoinPrice;
      total = total;
      setPriceInBtc(total.toFixed(8))
      return total;
    };
    usdToBtc();

    const interval = setInterval(() => {
      if (invoice) {
        getPaymentStatus(invoice)
          .then((data) => {
            if (data) {
              console.log(data);
              setPaymentStatus(data);
              return clearInterval(interval);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 5000);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (invoice) {
        getPaymentStatus(invoice)
          .then((data) => {
            console.log(data, "data false");
            if (data) {
              console.log(data, "data true");
              return clearInterval(interval);
            }
          })
          .catch((err) => {
            console.log(err, "errore");
          });
      }
    }, 5000);
  }, [showQr, invoice]);

  const onSubmit = () => {
    setShowLoading(true);
    setShowQr(true);
    // const a = props?.amount
    const a = priceInSats;
    // const m = props?.message;
    const m = props?.title;
    getInvoice(a, m)
      .then((data) => {
        console.log(a, "amount", m, "message xD");
        setInvoice(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPdf = () => {
    setShowPdfLink(true);
    // console.log(props.id, "props");
    // fetch("http://localhost:3001/partituras")
    fetch("https://lightning-partituras.herokuapp.com/partituras")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[props.id], "res2")
        setBackendData(data[props.id]);
      });
  };

  console.log(items, "items -------- xD")

  return (
    <div className="PayContainer">
      <div className="payInfoContainer">
        <p>Pay in bitcoin via lightning network!</p>
        <p>
         <span>Price:</span> USD: <b>${props?.amount}</b>  ≈ {BtcSat ? <>SAT <b>{priceInSats}</b></>   :  <>BTC <b>{priceInBtc}</b></> }
          <div className="Ln_logoContainer" onClick={ () => setBtcSat(!BtcSat)}>
            <img  className='Ln_logo' src={BtcSat ? LN : BTC} /> 
          </div>
        </p>
        <button className="payButton" onClick={onSubmit}>
          BUY
        </button>

        {showLoading ? (
          <div>
            {paymentStatus  ? (
              <div className="paidOut">
                <span>¡Thanks for your purchase!  :) </span> 
                <button className="getPdf" onClick={getPdf}>Get my pdf</button>
              </div>
            ) : (
              <div className="loader">
                Waiting for payment
                <span className="loader__dot">.</span>
                <span className="loader__dot">.</span>
                <span className="loader__dot">.</span>
              </div>
              // "esperando el PAGO"
            )}
          </div>
        ) : (
          <></>
        )}

        {/* <h2>LINK HACIA LA PARTITURA</h2>
            <p>{backendDate}</p> */}
        {showPdfLink ? (
          <div>
            {" "}
            <a href={backendDate} target="_BLANK">
              {props.title}.pdf
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="invoicesContainer">
        <div className="QrContainer">
          {showQr  ? (
            <QRcode
              value={invoice}
              includeMargin={true}
              size={250}
              renderAs="canvas"
              fgColor="black"
              bgColor={"rgba(255, 187, 0, 0.48)"}
              imageSettings={{
                src: "https://en.bitcoinwiki.org/upload/en/images/b/be/Bitsymb.png",
                x: null,
                y: null,
                height: 50,
                width: 50,
                excavate: true,
              }}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className={showLoading ? 'invoiceContainer' : 'invoiceContainerInactive'}>
          {/* <p>
            lnbc492720n1p3jyh23pp5ul53vsrs0jjvz048vkw7fulketpc98gvv98sknr4sr0y3c7recgsdx5gdhk6ur0wdjkggrz0ysyxmrpw4jx2gzyv4382umn0yszsvfcxcez6vfexyuzjt3qg9e8yctwvajkggrz0ysyxunfv9682unpypyk6ct8d9hxzunfvyhzqv3sw35zqsm9de682une9csyjmnyd9mxjer4v9kzqurpwf6zugp5ypcxzem9wvhzqsmjd9shgatjvysyjmtpva5kuctjd9sscqzpgxqyz5vqsp5883nj2lw7ercexyefgp95lrt87kr0dha5ag4s6fzcj73z6weu9eq9qyyssqne4r8ef6u6nj2umf0pxkp6hx6h5kemnvj53sq9emuy03enyy74k3krx6udtyryqntwel5c5sumjashej0c7862ttt8g2ma6jfdqx5qsp4af6yq
          </p> */}
          <p>{invoice}</p>
        </div>
      </div>
    </div>
  );
};

export default PayForm;
