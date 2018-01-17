import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TestApi extends Component
{
    constructor(props)
    {
          super(props);
            this.state = {
                products:[]
            }
     }
    componentDidMount()
    {
        axios.get('api/product')
        .then(res => {
            console.log('products');
            this.setState({ products: res.data });
        // console.log(this.state.products);
        });
      
    }
    render()
    {
        return(
           <div >
            <div>test web api without cors </div>
              <table>
              <thead>
                <tr>
                <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map(product =>
                  <tr>
                    <td>{product.ProductID}</td>
                    <td>{product.ProductName}</td>
                     <td>{product.Quantity}</td>
                      <td>{product.Price}</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
        );
    };
}
export default TestApi;
