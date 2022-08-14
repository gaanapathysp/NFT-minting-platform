import React, {useState} from 'react';
import {uploadToIpfs} from '../../utils/upload';
import {mintNFT} from '../../utils/wallet';
import {useSelector} from 'react-redux';
import {selectLoaded, selectStorage} from '../../store/reducers/storage';
import Powerslap from "../video/235.mp4";

const Mint = () => {
    const loaded = useSelector(selectLoaded);
    const storage = useSelector(selectStorage);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const submit = async (event) => {
        try {
          event.preventDefault();
          setLoading(true);
          const address = event.target.address.value;
          const name = event.target.name.value;
          const description = event.target.description.value;
          const file = event.target.image.files[0];
    
          const ipfsUrl = await uploadToIpfs(name, description, file);
          console.log('Uploaded To IPFS!');
          const token_id = storage.length;
          const op = await mintNFT(address, ipfsUrl, token_id);
    
          console.log(op);
          setMessage('Minted Successfully!');
    
          const stor = [...storage];
          stor.push({
            token_id: token_id,
            url: ipfsUrl,
          });
    
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
          setMessage('Error: Not Able to Mint');
        }
      };
      const closeMessage = () => {
        setMessage('');
      };
      return (
        <div className="container">
            <video
     autoPlay
     loop
     muted
     style={{
       position: "absolute",
       width:"100%",
       left:"50%",
       top:"50%",
       height:"100%",
       opacity: 0.9,
       objectFit: "cover",
       transform:"translate(-50%, -50%)",
       zIndex:"-1"
        }
     }
       >
        <source src={Powerslap} type="video/mp4"></source>

    </video>
          {message && (
            <div className="position-fixed top-0 end-0 p-3" style={{zIndex: 11}}>
              <div id="liveToast" className="toast fade show d-flex" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-body">{message}</div>
                <button type="button" className="btn-close me-2 m-auto" onClick={closeMessage}></button>
              </div>
            </div>
          )}
          <form onSubmit={submit}>
            <div className="mb-3">
              <label  style = {{
                color: "#FFD700",
                fontWeight: "900",
                fontSize: "21px"
            }}
              htmlFor="tokenID" className="form-label">
                Token ID
              </label>
              <input style={{width:"80px",opacity:0.9}}
                type="number"
                className="form-control"
                id="tokenID"
                aria-describedby="tokenID"
                required
                value={storage.length}
                disabled
              />
            </div>
            <div className="mb-3">
              <label 
              style = {{
                color: "#FFD700",
                fontWeight: "900",
                fontSize: "21px"
            }}htmlFor="address" className="form-label">
                Address
              </label>
              <input 
              style={{width:"600px",opacity:0.9}}type="text" className="form-control" id="address" aria-describedby="address" required />
            </div>
            <div className="mb-3">
              <label 
              style = {{
                color: "#FFD700",
                fontWeight: "900",
                fontSize: "21px"
            }}htmlFor="name" className="form-label">
                Name
              </label>
              <input 
              style={{width:"600px",opacity:0.9}}
              type="text" className="form-control" id="name" aria-describedby="name" required />
            </div>
            <div className="mb-3">
              <label
              style = {{
                color: "#FFD700",
                fontWeight: "900",
                fontSize: "21px"
            }} htmlFor="description" className="form-label">
                Description
              </label>
              <input
              style={{width:"600px",opacity:0.9}}
               type="text" className="form-control" id="description" aria-describedby="description" required />
            </div>
            <div className="mb-3">
              <label
              style = {{
                color: "#FFD700",
                fontWeight: "900",
                
            }} htmlFor="image" className="form-label">
                Image
              </label>
              <input
              style={{width:"600px",opacity:0.9}}
               className="form-control" type="file" id="image" accept="image/*" required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!loaded || loading}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              Mint
            </button>
          </form>
        </div>
      );
    };

    export default Mint;