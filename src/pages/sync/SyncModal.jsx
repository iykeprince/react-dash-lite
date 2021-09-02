import React from 'react';

const SyncModal = ({onHide, setData, data, handleSubmit, user}) => {
        
    return (
        <div className="modal-body">
            <div className="card card-bordered">
                <div className="card-inner">

                    <form className="gy-3" onSubmit={handleSubmit}>
                        <div className="card-head">
                            <h5 className="card-title">Stock Trading Application</h5>
                        </div>
                        <div className="row g-3 align-center">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="form-label">Email Address/Username</label>
                                    <span className="form-note">We'll never share your email with anyone
                                        else.</span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            onChange={e => setData({...data, stockEmail: e.target.value})}
                                            value={data.stockEmail} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 align-center">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <span className="form-note">You're advised to change your password after the
                                        synchronization process.</span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            onChange={e => setData({ ...data, stockPassword: e.target.value})} 
                                            value={data.stockPassword}    
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="card-head">
                            <h5 className="card-title">Forex Trading Application</h5>
                        </div>
                        <div className="row g-3 align-center">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="form-label">Email Address/Username</label>
                                    <span className="form-note">We'll never share your email with anyone
                                        else.</span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            onChange={e => setData({...data, forexEmail: e.target.value})} 
                                            value={data.forexEmail}    
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 align-center">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <span className="form-note">You're advised to change your password after the
                                        synchronization process.</span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            onChange={e => setData({...data, forexPassword: e.target.value})}    
                                            value={data.forexPassword}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="card-head">
                            <h5 className="card-title">Crypto Trading Application</h5>
                        </div>
                        <div className="row g-3 align-center">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="form-label">Wallet ID</label>
                                    <span className="form-note">We'll never share your wallet ID with anyone
                                        else.</span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            onChange={e => setData({...data, cryptoWalletId: e.target.value})} 
                                            value={data.cryptoWalletId}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 align-center">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <span className="form-note">You're advised to change your password after the
                                        synchronization process.</span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            onChange={e => setData({...data, cryptoWalletPassword: e.target.value})} 
                                            value={data.cryptoWalletPassword}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3 align-center">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="form-label">Bitfetter ID</label>
                                    <span className="form-note">Enter your Unique Bitfetter ID to verify the
                                        synchronization.</span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input type="text" 
                                            className="form-control" 
                                            onChange={e => setData({...data, bitfetterId: e.target.value})} 
                                            value={data.bitfetterId} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-lg-7 offset-lg-5">
                                <div className="form-group mt-2">
                                    <button type="submit" className="btn btn-lg btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SyncModal