import { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import {toast} from 'react-toastify'
const  Cart = () => {
    const [mainCart, setMainCart] = useState([])
    const [cart, setCart ] = useState([])
    const [isModal, setIsModal] = useState(false)

    const addCartHandler = (item) =>{
        setCart(prev => {
            return [...prev, item]
        })
        toast.dark('Product aded successfly')
    }
    const modalHandler = () => {
        setIsModal(!isModal)
    }

    useEffect(() => {
        alanBtn({
            key: 'your_alan_key',
            // key: '01a9787d93e82a6c0bb53be82caee9182e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
              if (commandData.command === 'getMenu') {
                setMainCart(commandData.data)
              }else if(commandData.command === "showCart"){
                addCartHandler(commandData.data)
              }else if(commandData.command === "openCart"){
                setIsModal(commandData.data)
              }else if(commandData.command === "closeCart"){
                setIsModal(commandData.data)
              }
            }
        });
      }, []);

  return (
    <div className='album py-5 bg-light'>
        <div className='container'> 
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{minHeight: "150px"}}>
                {mainCart.map((item) => (
                    <div key={item.id} className='col'>
                        <div className="card shadow-sm p-3">
                            <div className="card-title">
                                <h4 className='text-muted text-center '>Product #{item.id}</h4>
                            </div>
                            <img 
                            src={item.image} 
                            alt={item.title} 
                            width="100%"
                            height="400px"
                            className='bg-placeholder card-image-top'/>
                            <div className="card-body">
                                <p className="card-text">{item.title.slice(0, 20)}</p>
                                <p className='card-text fw-lighter'>{item.description.slice(0, 100)}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-item-center">
                                <div>
                                    <span>{item.category}</span>
                                </div>
                                <span className='text-muted'>${item.price}</span>
                            </div>
                            <button onClick={() => addCartHandler(item)} className='mt-3 btn btn-outline-primary'>Add cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
       <div className="fixed-top m-3">
       <button
            onClick={modalHandler}
        type="button" className="btn btn-primary position-relative">
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
            </span>
        </button>  
       </div>
       {isModal && (
        <div className="modal" style={{display: 'block', background: "rgba(0,0,0, .8)"}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cart</h5>
              <button onClick={modalHandler} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {cart.map((item) => (
                <div key={item.id} className='card md-3'>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={item.image} alt={item.title}
                            className='img-fluid rounded-start' />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className='card-title'>{item.title}</h5>
                                <p className='card-text text-muted'>
                                    {item.description.slice(0, 100)}
                                </p>
                                <p className='card-text'>${item.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button onClick={modalHandler} type="button" className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      </div>
       )}
      
    </div>
  )
}


export default Cart;