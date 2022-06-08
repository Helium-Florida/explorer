import { FC } from 'react'
import { Balance } from '@helium/currency'
import Currency from '../Common/Currency'

interface Props {
  title: string
  amount: Balance<any>
  usdAmount: number
  icon: string
  extra?: JSX.Element
}

const TokenListItem: FC<Props> = ({
  title,
  amount,
  usdAmount,
  icon,
  extra,
}) => {
  return (
    <div className="bg-gray-200 p-3 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img alt="" src={icon} className="w-7" />
          <div className="grid">
            <span className="font-medium text-lg text-darkgray-800">
              {title}
            </span>
          </div>
        </div>

        <div className="grid text-right">
          <span className="font-medium text-darkgray-800">
            {amount.toString(2)}
          </span>
          {usdAmount !== undefined && (
            <span className="text-sm text-gray-800">
              <Currency value={usdAmount} />
            </span>
          )}
        </div>
      </div>
      {extra}
    </div>
  )
}

export default TokenListItem
