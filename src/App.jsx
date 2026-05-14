// App.jsx
import { useState } from 'react'
import bgImg from './assets/backgroundpic.jpeg'
import './index.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components/index.js'
import { FaHistory, FaCalculator } from 'react-icons/fa'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('ngn')
  const [convertedAmount, setConvertedAmount] = useState(0)

  // HISTORY STATE
  const [history, setHistory] = useState([])

  // TOGGLE STATE
  const [showHistory, setShowHistory] = useState(false)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    const result = amount * currencyInfo[to]

    setConvertedAmount(result)

    // SAVE LAST 5 HISTORY
    const newHistory = {
      id: Date.now(),
      amount,
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      result: result.toFixed(2),
    }

    setHistory((prev) => [newHistory, ...prev].slice(0, 4))
  }

  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat transition ease-in-out duration-[3000ms]'
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className='w-full'>
        <div className='relative w-full max-w-md mx-auto border border-gray-60 rounded-2xl p-5 backdrop-blur-md bg-white/30 shadow-xl'>

          {/* TOGGLE ICON */}
          <div className='absolute top-4 right-4 z-50 pb-4'>
            {!showHistory ? (
              <button
                onClick={() => setShowHistory(true)}
                className='bg-indigo-600/90 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition duration-300'
              >
                <FaHistory size={18} />
              </button>
            ) : (
              <button
                onClick={() => setShowHistory(false)}
                className='bg-indigo-600/90 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition duration-300'
              >
                <FaCalculator size={18} />
              </button>
            )}
          </div>

          {/* HISTORY PAGE */}
          {showHistory ? (
            <div className='mt-12'>
              <h2 className='text-2xl font-bold text-white mb-5'>
                Conversion History
              </h2>

              {history.length === 0 ? (
                <div className='bg-white/40 rounded-xl p-4 text-center text-gray-700 font-medium'>
                  No conversion history yet
                </div>
              ) : (
                <div className='space-y-3'>
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className='bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/30'
                    >
                      <p className='text-gray-800 font-semibold'>
                        {item.amount} {item.from}
                      </p>

                      <p className='text-indigo-700 font-bold text-lg'>
                        {item.result} {item.to}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // CALCULATOR PAGE
            <form
              onSubmit={(e) => {
                e.preventDefault()
                convert()
              }}
              className='mt-12'
            >
              <div className='w-full mb-1'>
                <InputBox
                  label='from'
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
              </div>

              <div className='relative w-full h-0.5'>
                <button
                  type='button'
                  className='z-40 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-700 transition duration-500'
                  onClick={swap}
                >
                  Swap
                </button>
              </div>

              <div className='w-full opacity-80 mb-1'>
                <InputBox
                  label='to'
                  currencyOptions={options}
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                  amountDisabled
                />
              </div>

              <button
                type='submit'
                className='w-full mt-4 bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition duration-500 font-semibold shadow-lg'
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default App