import React from 'react'
import { useState,useEffect} from 'react'
import {Card,Button} from 'react-bootstrap';






function UserList() {
  const[products,setProducts]=useState([]) 
 const [addedToCart, setAddedToCart] = useState({});
   

  useEffect(() => {
     fetch('https://fakestoreapi.com/products')
     .then(data=> data.json())
     .then(result=> setProducts(result))
    
  }, [])

  const addTocart=(product)=>{
    // dispatch
    dispatch(addQty({ productId: product.id }))
    dispatch(add(product))
    // after added to cart button changed to Added to cart
    setAddedToCart({ ...addedToCart, [product.id]: true });
    // console.log(product)
  }
    
 

  return (
    <>
   
    <div className='userlist-container'> 
      <div className='row'>
        {products.map(product=>(
   
   <div className='col-md-3' style={{marginBottom:'10px'}}>
      <Card key={product.id} className='h-100'>
           <div className='text-center'>
               <Card.Img variant="top" src={product.image} style={{width :'100px',height:'130px',padding:'5px'}}/>
            </div>
       <Card.Body>
          <Card.Title>{product.title}</Card.Title> 
          <Card.Text style={{display:'flex',justifyContent:'flex-end',fontWeight:'700'}} >
             {product.price}
          </Card.Text>
          <Card.Text>
                <p>subcategory</p>
                <p>weight</p>
                 <p>description</p> 
                 <p>Product Specification</p>
          </Card.Text>
       </Card.Body>
         <Card.Footer className='bg-white' style={{display: 'flex',justifyContent:'center'}}>
                 {addedToCart[product.id] ? ( <Button variant='danger'>Added to Cart</Button>  )                
                         : (<Button variant='primary' onClick={() => addTocart(product)}>Add to Cart </Button>)}
         </Card.Footer>
       </Card>
   </div>
 
 ))}
       
    </div>
    </div>
    </>
  )
}

export default UserList