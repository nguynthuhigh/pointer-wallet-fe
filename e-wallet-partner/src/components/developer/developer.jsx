import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Header from '../header/header'
import { Link } from 'react-router-dom';
const Component = ({...props}) => {
    const codeString = props.stringcode;

    return (
      <div>
        <div className='flex items-center'><h1 className='font-bold text-xl py-2'>{props.api_url}</h1><Link className='ml-2 font-semibold text-blue-500' to='/webhook'>{props.condition}</Link></div>
        <SyntaxHighlighter language={props.language} style={docco} className="rounded-xl">
        {codeString}
      </SyntaxHighlighter>
      </div>
    );
  };
  const Description = ({...props})=>{
    return(
        <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-lg antialiased font-normal leading-normal text-blue-gray-900">
            {props.properties}
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-lg antialiased font-normal leading-normal text-blue-gray-900">
          {props.type}
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-lg antialiased font-normal leading-normal text-blue-gray-900">
          {props.description}
          </p>
        </td>
      </tr>
    )
  }
export default function Developer(){
    return(
      <div>
        <Header color={true}></Header>
        <div className="max-w-[1200px] pt-20 mx-auto">
          <div className='flex '>
            <div className='w-[70%] my-5'>
              <h1 className='font-bold text-4xl '>
                API Reference
              </h1>
              <div className='space-y-3 my-2'>
                <h1>The pressPay API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</h1>
                <p>You can use the pressPay API in test mode, which doesn’t affect your live data or interact with the banking networks.</p>
                <p>The pressPay API doesn’t support bulk updates. You can work on only one object per request.</p>
              </div>

            </div>
            <div className='ml-auto'>
              <Component language="http" api_url="BASE URL" stringcode={`https://presspay-api.azurewebsites.net`}></Component>
            </div>
          </div>
          <Component language="javascript" api_url={"POST /api/v1/payment"} condition={"Use Webhooks"} stringcode={
`{
    "private_key":"pk_presspay_62849c1e70084b1d3372ad5a8913f918fab3d64324a9de6a7b4adbbfdcf8e70d",
    "amount":"20000",
    "currency":"VND",
    "message":"Product's name",
    "userID":"668fd2abaa7b610a6e7089ee",
    "OrderID":"Order001"
    "return_url":"your.domain.com/order?id={orderID}",
    
}`}>    
          </Component>
          <Component language="javascript" api_url={"Response"} stringcode={
`{
    "message":"Redirect to url",
    "data":{
        "url":"https://presspay.vercel.app/payment-gateway?token={token}"
    }
}`}>    
          </Component>
          <div className='mt-5'> 
            <Table></Table>
          </div>
          <div className='mt-10'>
        
            <Component language="javascript" api_url={"POST /api/v1/refund"} stringcode={
`{
    "private_key":"pk_presspay_62849c1e70084b1d3372ad5a8913f918fab3d64324a9de6a7b4adbbfdcf8e70d",
    "orderID":"Order001"
}`}>    
            </Component>
            <Component language="javascript" api_url={"Response"} stringcode={
`{
  "message":"Hoàn tiền thành công"
}`}>    
            </Component>
          </div>
        </div>
      </div>
   )
}
const Table = ()=>{
  return(
    <div class="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md bg-clip-border rounded-lg">
      <table class="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased text-black leading-none font-semibold opacity-70">
                Field
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased text-black leading-none font-semibold opacity-70">
                Type
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased text-black leading-none font-semibold opacity-70">
                Decriptions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
        <Description properties="private_key" type="string" description="The private key used for authentication." />
        <Description properties="amount" type="number" description="The amount of money in the transaction, usually in the smallest unit of the currency (e.g.,  USD or VND)." />
        <Description properties="currency" type="string" description="The currency code (e.g., 'VND', 'USD', 'ETH')." />
        <Description properties="message" type="string" description="A message or description of the product or transaction." />
        <Description properties="user_id" type="string" description="The unique identifier of the user making the transaction." />
        <Description properties="order_id" type="string" description="The unique identifier of the order associated with the transaction, used for tracking and managing the order." />
        <Description properties="return_url" type="string" description="The URL to which the user will be redirected after the transaction is completed, often including the orderID in query parameters." />

        </tbody>
      </table>
    </div>
  )
}