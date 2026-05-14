import React, { useId } from 'react'
import Select from 'react-select'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currrencyDisabled = false,
  className = "",
}) {
  const id = useId()

  // transform options for react-select
  const options = currencyOptions.map((currency) => ({
    value: currency,
    label: currency.toUpperCase(),
  }))

  const selectedValue = options.find(
    (opt) => opt.value === selectedCurrency
  )

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      
      {/* AMOUNT */}
      <div className='w-1/2'>
        <label htmlFor={id} className='text-black/40 mb-2 inline-block'>
          {label}
        </label>

        <input
          id={id}
          type="number"
          className='outline-none w-full bg-transparent py-1.5'
          placeholder='Amount'
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>

      {/* CURRENCY (REACT SELECT) */}
      <div className='w-1/2 flex flex-col items-end'>
        <p className="text-black/40 mb-2">Currency Type</p>

        <div className="w-full">
          <Select
            value={selectedValue}
            onChange={(option) =>
              onCurrencyChange(option.value)
            }
            options={options}
            isDisabled={currrencyDisabled}
            isSearchable
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#f3f4f6", // matches gray-100
                border: "none",
                boxShadow: "none",
                minHeight: "32px",
                fontSize: "12px",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                padding: 4,
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0px 6px",
              }),
              menu: (base) => ({
                ...base,
                fontSize: "12px",
              }),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default InputBox