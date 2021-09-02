import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom";
import { confirmTransaction, nav1, nav3, nav5, resetConfirmTransaction, updateWallet } from "../../../redux/deposit/deposit.actions";
import uuid from 'react-uuid'
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import Spinner from "../../../components/spinner/spinner.component";
import CopyToClipboard from "react-copy-to-clipboard";

const DepositContainer4 = () => {
    const dispatch = useDispatch();
    const postData = useSelector(state => state.deposit.postData)
    const [hashValue, setHashValue] = useState(uuid());
    const message = useSelector(state => state.deposit.message);

    const [show, setShow] = useState(false);
    const [transactionId, setTransactionId] = useState(hashValue);
    const confirm = useSelector(state => state.deposit.confirmTransaction);
    const loading = useSelector(state => state.deposit.loading)
    const [copied, setCopied] = useState(false)
    const confirmingTransaction = useSelector(state => state.deposit.confirmingTransaction)
    const preferenceData = useSelector(state => state.profile.preferenceData)
    const exchangeData = useSelector(state => state.util.exchangeData);

    useEffect(() => {
        if (message) {
            toast.success(message)
            setShow(true);
        }
        if (confirm) {
            // history.push(`/deposit/success?hash=${hashValue}`);
            dispatch(nav5())
            // dispatch(resetConfirmTransaction())
        }
    }, [message, confirm])

    const handleChange = e => {
        setHashValue(e.target.value)
    }

    const handleClick = () => {
        dispatch(updateWallet({ ...postData, hashValue }));
    }

    const handleCancelOrder = () => {
        dispatch(nav1())
    }

    const handleConfirmTransaction = (e) => {
        e.preventDefault();
        console.log('Transaction id', transactionId)
        dispatch(confirmTransaction(transactionId))
    }

    if (preferenceData === null)
        return <Spinner />

    const imgURL = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=bitcoin:${preferenceData.bitcoin_address}&choe=UTF-8`;

    return (<>

        <div className="page-dw wide-xs m-auto">
            <div className="nk-pps-apps">
                <div className="nk-pps-steps">
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step active"></span>
                </div>
                <div className="nk-pps-title text-center">
                    <h3 className="title">Make Your Payment</h3>
                    <p className="caption-text">Your order <strong className="text-dark">{hashValue}</strong> has been placed successfully. To complete, please send the exact amount of <strong className="text-dark">{postData.amountBTC} {postData.currency.toUpperCase()}</strong> to the address below.</p>
                </div>
                <div className="nk-pps-card card card-bordered popup-inside">
                    <div className="card-inner-group">
                        <div className="card-inner card-inner-sm">
                            <div className="card-head mb-0">
                                <h6 className="title mb-0">Pay Bitcoin</h6>
                                <div className="card-opt"><span className="counter" data-countdown-second="10799" data-countdown-text="Expire in">Expire in 2:59:42</span></div>
                            </div>
                        </div>
                        <div className="card-inner">
                            <div className="qr-media mx-auto mb-3 w-max-300px">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100" viewBox="0 0 100 100">
                                    <rect x="0" y="0" width="100" height="100" fill="#ffffff"></rect>
                                    <g transform="scale(3.03)">
                                        <g transform="translate(0,0)">
                                            <path fillRule="evenodd" d="M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L14 4L14 5L15 5L15 6L14 6L14 8L13 8L13 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L10 9L10 11L11 11L11 9L12 9L12 10L13 10L13 9L14 9L14 10L15 10L15 13L14 13L14 12L13 12L13 11L12 11L12 13L13 13L13 14L11 14L11 17L10 17L10 16L8 16L8 13L9 13L9 14L10 14L10 13L11 13L11 12L8 12L8 11L9 11L9 10L8 10L8 11L7 11L7 10L6 10L6 11L7 11L7 12L6 12L6 13L4 13L4 12L5 12L5 11L4 11L4 9L5 9L5 8L0 8L0 9L3 9L3 10L0 10L0 11L1 11L1 12L0 12L0 13L1 13L1 14L2 14L2 15L0 15L0 16L2 16L2 17L3 17L3 18L1 18L1 20L0 20L0 25L1 25L1 22L2 22L2 23L3 23L3 24L2 24L2 25L4 25L4 23L7 23L7 22L8 22L8 21L7 21L7 20L8 20L8 19L7 19L7 18L6 18L6 17L7 17L7 16L8 16L8 17L9 17L9 20L11 20L11 19L10 19L10 18L11 18L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L16 21L16 22L15 22L15 23L14 23L14 24L15 24L15 23L16 23L16 24L17 24L17 25L16 25L16 26L15 26L15 25L12 25L12 23L13 23L13 22L11 22L11 21L10 21L10 24L9 24L9 23L8 23L8 24L6 24L6 25L8 25L8 27L9 27L9 28L8 28L8 33L9 33L9 32L10 32L10 33L12 33L12 31L13 31L13 30L11 30L11 31L10 31L10 30L9 30L9 28L10 28L10 29L11 29L11 26L10 26L10 24L11 24L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L15 29L15 28L17 28L17 29L16 29L16 30L15 30L15 31L14 31L14 32L15 32L15 33L16 33L16 31L18 31L18 29L19 29L19 30L20 30L20 31L21 31L21 32L19 32L19 33L21 33L21 32L22 32L22 31L23 31L23 29L21 29L21 28L22 28L22 27L21 27L21 26L23 26L23 28L24 28L24 29L25 29L25 30L26 30L26 31L25 31L25 32L23 32L23 33L28 33L28 32L26 32L26 31L27 31L27 30L26 30L26 29L28 29L28 30L29 30L29 31L30 31L30 32L29 32L29 33L30 33L30 32L31 32L31 33L32 33L32 32L31 32L31 31L30 31L30 30L33 30L33 27L32 27L32 26L33 26L33 25L32 25L32 26L31 26L31 25L30 25L30 26L31 26L31 27L29 27L29 24L31 24L31 23L32 23L32 24L33 24L33 23L32 23L32 22L33 22L33 20L32 20L32 18L33 18L33 17L32 17L32 16L31 16L31 15L32 15L32 14L33 14L33 13L32 13L32 14L29 14L29 15L26 15L26 14L28 14L28 13L29 13L29 12L33 12L33 11L32 11L32 10L33 10L33 9L32 9L32 8L31 8L31 9L32 9L32 10L31 10L31 11L30 11L30 8L29 8L29 10L27 10L27 9L28 9L28 8L27 8L27 9L26 9L26 8L25 8L25 5L24 5L24 4L23 4L23 3L22 3L22 2L19 2L19 1L25 1L25 0L17 0L17 2L18 2L18 3L16 3L16 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM13 2L13 3L14 3L14 4L15 4L15 5L17 5L17 8L18 8L18 10L17 10L17 9L16 9L16 8L14 8L14 9L15 9L15 10L16 10L16 11L17 11L17 12L18 12L18 10L19 10L19 11L20 11L20 13L21 13L21 14L22 14L22 15L23 15L23 17L24 17L24 18L21 18L21 17L22 17L22 16L21 16L21 15L20 15L20 14L19 14L19 13L17 13L17 14L16 14L16 13L15 13L15 14L13 14L13 15L12 15L12 17L14 17L14 18L16 18L16 17L17 17L17 18L18 18L18 19L17 19L17 20L18 20L18 21L19 21L19 20L21 20L21 21L20 21L20 22L17 22L17 24L18 24L18 25L20 25L20 24L21 24L21 25L24 25L24 24L23 24L23 23L24 23L24 22L25 22L25 23L26 23L26 24L27 24L27 23L28 23L28 24L29 24L29 23L31 23L31 22L32 22L32 20L30 20L30 19L31 19L31 16L29 16L29 17L28 17L28 16L26 16L26 17L25 17L25 16L24 16L24 15L25 15L25 14L26 14L26 13L28 13L28 12L29 12L29 11L28 11L28 12L26 12L26 13L25 13L25 11L26 11L26 9L25 9L25 8L24 8L24 10L22 10L22 12L21 12L21 11L20 11L20 10L19 10L19 8L18 8L18 5L17 5L17 4L15 4L15 2ZM24 2L24 3L25 3L25 2ZM18 3L18 4L21 4L21 7L20 7L20 5L19 5L19 7L20 7L20 9L23 9L23 7L24 7L24 5L23 5L23 4L22 4L22 3ZM22 5L22 7L21 7L21 8L22 8L22 7L23 7L23 5ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 7L16 7L16 6ZM10 8L10 9L11 9L11 8ZM24 10L24 11L25 11L25 10ZM1 12L1 13L2 13L2 14L3 14L3 15L2 15L2 16L3 16L3 15L6 15L6 16L7 16L7 15L6 15L6 14L7 14L7 13L8 13L8 12L7 12L7 13L6 13L6 14L3 14L3 13L2 13L2 12ZM22 12L22 14L24 14L24 13L23 13L23 12ZM15 14L15 15L14 15L14 16L15 16L15 15L16 15L16 16L17 16L17 17L18 17L18 16L20 16L20 17L19 17L19 18L20 18L20 17L21 17L21 16L20 16L20 15L19 15L19 14L18 14L18 16L17 16L17 15L16 15L16 14ZM4 16L4 18L3 18L3 19L2 19L2 20L1 20L1 21L2 21L2 22L3 22L3 23L4 23L4 21L6 21L6 22L7 22L7 21L6 21L6 20L7 20L7 19L5 19L5 16ZM26 17L26 18L25 18L25 19L23 19L23 20L22 20L22 19L21 19L21 20L22 20L22 21L21 21L21 22L22 22L22 23L21 23L21 24L22 24L22 23L23 23L23 22L24 22L24 21L23 21L23 20L25 20L25 22L26 22L26 23L27 23L27 21L26 21L26 20L25 20L25 19L26 19L26 18L27 18L27 20L28 20L28 21L30 21L30 20L29 20L29 19L28 19L28 18L27 18L27 17ZM29 17L29 18L30 18L30 17ZM3 19L3 20L2 20L2 21L4 21L4 20L5 20L5 19ZM14 19L14 20L15 20L15 19ZM22 21L22 22L23 22L23 21ZM18 23L18 24L19 24L19 23ZM25 25L25 28L28 28L28 25ZM9 26L9 27L10 27L10 26ZM17 26L17 28L18 28L18 26ZM19 26L19 27L20 27L20 28L19 28L19 29L20 29L20 30L21 30L21 29L20 29L20 28L21 28L21 27L20 27L20 26ZM26 26L26 27L27 27L27 26ZM14 27L14 28L15 28L15 27ZM29 28L29 30L30 30L30 29L31 29L31 28ZM17 32L17 33L18 33L18 32ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM26 0L26 7L33 7L33 0ZM27 1L27 6L32 6L32 1ZM28 2L28 5L31 5L31 2ZM0 26L0 33L7 33L7 26ZM1 27L1 32L6 32L6 27ZM2 28L2 31L5 31L5 28Z" fill="#000000"></path>
                                        </g>
                                    </g>
                                </svg> */}
                                {/* <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=bitcoin:ksldfiosueorijepf?amount=${postData.amountBTC}`}

                                /> */}
                                <img src={imgURL} style={{ width: '300px' }} />
                            </div>
                            <div className="pay-info text-center">
                                <h5 className="title text-dark mb-0 clipboard-init" data-clipboard-text={preferenceData.bitcoin_address}>
                                    {postData.amountBTC} {postData.currency.toUpperCase()}{" "}
                                    <CopyToClipboard text={preferenceData.bitcoin_address}
                                        onCopy={() => {
                                            setCopied(true);
                                            setTimeout(() => {setCopied(false)}, 3000)
                                            }}>
                                        <button className="btn btn-primary"><i className="ni ni-copy"></i></button>
                                    </CopyToClipboard>
                                </h5>
                                {copied && <p>Copied!</p>}
                                <p className="text-soft">{postData.amountUSD} USD ~ {(postData.amountUSD / exchangeData.price).toFixed(6)} BTC</p>
                            </div>

                            {/* <div className="form-group">
                                <div className="form-label overline-title-alt lg text-center">Bitcoin Address</div>
                                <div className="form-control-wrap">3Gnn9hHHKSdcazcFTEM13MvLCZz6BgRKC6
                                    <div className="form-clip clipboard-init nk-tooltip" data-clipboard-target="#wallet-address" title="" data-original-title="Copy" aria-describedby="tooltip50457">
                                        <em className="click-to-copy icon ni ni-copy"></em>
                                    </div>
                                    <div className="form-icon"><em className="icon ni ni-sign-btc-alt"></em></div>
                                    </div>3Gnn9hHHKSdcazcFTEM13MvLCZz6BgRKC6
                            <input readOnly type="hidden" className="form-control form-control-lg" id="wallet-address" value={preferenceData.bitcoin_address} />
                                </div> */}

                            <div className="nk-pps-action">
                                <button onClick={handleClick} className="btn btn-block btn-primary popup-open"><span>Paid Bitcoin</span></button>
                            </div>
                            {/* <div className="nk-pps-action pt-2 text-center">0.109
                                <a href="#" className="link link-btn link-primary">Pay Later</0.109a>0.1090.109
                            </div> */}

                            <Modal
                                size="lg"
                                show={show}
                                onHide={() => setShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg"

                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div >
                                        <div className="content">
                                            {/* <h6 className="mb-2">Confirm your payment</h6> */}
                                            <h6 className="mb-2">Confirm your payment</h6>
                                            <p>If you already paid, please provide us your payment reference to speed up verification procces.</p>
                                            <form className="form" id="crypto-pay-reference" onSubmit={handleConfirmTransaction}>
                                                <div className="form-group">
                                                    <div className="form-label">Payment Reference <span className="text-danger">*</span></div>
                                                    <div className="form-control-wrap">
                                                        <input name="reference" type="text" className="form-control" onChange={e => setTransactionId(e.target.value)} value={transactionId} placeholder="Enter your reference id / hash" />
                                                    </div>
                                                </div>
                                                <ul className="btn-group justify-between align-center gx-4">
                                                    <li><button type="submit" className="btn btn-primary btn-block" >Confirm Payment</button></li>
                                                    <li><button onClick={() => setShow(false)} className="link link-btn link-secondary popup-close">Close</button></li>
                                                </ul>
                                            </form>
                                            <div className="alert-note is-plain mt-4">
                                                <em className="icon ni ni-alert-circle"></em>
                                                <p>Your account will be credited once we confirm your payment.</p>
                                            </div>
                                        </div>
                                        {/* <div className="popup-overlay"></div> */}
                                    </div>
                                </Modal.Body>
                            </Modal>


                        </div>
                        <div className="card-inner bg-lighter">
                            <ul>
                                <li className="alert-note is-plain text-danger">
                                    <em className="icon ni ni-alert-circle"></em>
                                    <p>Be aware that this order might be cancelled if you send any BTC amount lesser than the amount above.</p>
                                </li>
                                <li className="alert-note is-plain">
                                    <em className="icon ni ni-info"></em>
                                    <p>Account will credited once we received your payment.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nk-pps-action mt-n2">
                    <ul className="btn-group justify-between align-center gy-3">
                        <li><button onClick={handleCancelOrder} className="link link-danger">Cancel Order</button></li>
                        <li><Link to="/" className="link link-primary"><span>Back to Dashboard</span> <em className="icon ni ni-arrow-long-right"></em></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
    )
}
export default DepositContainer4