import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { InputBox } from './components/index.js'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    amount(setConvertedAmount)
  }


  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center
    bg-cover bg-no-repeat'
      style={{ backgroundImage: `url(https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=800)` }}>
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5
      backdrop:blur-sm bg-white/30'>
          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
            <div className='w-full mb-1'>
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className='relative w-full h-0.5 '>
              <button
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-lg'
              onClick={swap} 
              >Swap</button>
            </div>
            <div className='w-full mb-1'>
              <InputBox
                label="to"
                amount={convertedAmount}
                amountDisabled={true}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                // onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={to}
              />
            </div>
            <button
            type='submit'
            className='bg-blue-500 text-white w-full px-4 py-1 rounded-lg mt-4'
            >Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
