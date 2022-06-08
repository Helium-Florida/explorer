import { Account } from '@helium/http'
import { orderBy, times } from 'lodash'
import { FC, Key, useMemo } from 'react'
import { useMarket } from '../../data/market'
import Skeleton from '../Common/Skeleton'
import PeriodizedRewardsWidget from '../Widgets/PeriodizedRewardsWidget'
import TokenListItem from './TokenListItem'

interface Props {
  account: Account
}

const AccountTokenList: FC<Props> = ({ account }) => {
  const { market } = useMarket()

  const data = useMemo(() => {
    return orderBy(
      [
        {
          title: 'HNT',
          icon: '/images/hnt.svg',
          amount: account?.balance,
          usdAmount: account?.balance?.times(market?.price)?.floatBalance,
          floatAmount: account?.balance?.floatBalance,
        },
        {
          title: 'HST',
          icon: '/images/hst.svg',
          amount: account?.secBalance,
          floatAmount: account?.secBalance?.floatBalance,
        },
        {
          title: 'DC',
          icon: '/images/dc.svg',
          amount: account?.dcBalance,
          usdAmount: account?.dcBalance?.toUsd()?.floatBalance,
          floatAmount: account?.dcBalance?.floatBalance,
        },
        {
          title: 'HNT Staked',
          icon: '/images/validator.svg',
          amount: account?.stakedBalance,
          usdAmount: account?.stakedBalance?.times(market?.price)?.floatBalance,
          floatAmount: account?.stakedBalance?.floatBalance,
        },
      ],
      'floatAmount',
      'desc',
    )
  }, [
    account?.balance,
    account?.dcBalance,
    account?.secBalance,
    account?.stakedBalance,
    market?.price,
  ])

  if (!account) return <TokenListSkeleton />

  return (
    <div className="col-span-2 space-y-2">
      {data.map(({ title, icon, amount, usdAmount }) =>
        title === 'HNT' ? (
          <TokenListItem
            key={title}
            title={title}
            icon={icon}
            amount={amount}
            usdAmount={usdAmount}
            extra={
              <PeriodizedRewardsWidget
                address={account?.address}
                type="account"
                title="Earnings (UTC)"
              />
            }
          />
        ) : (
          <TokenListItem
            key={title}
            title={title}
            icon={icon}
            amount={amount}
            usdAmount={usdAmount}
          />
        ),
      )}
    </div>
  )
}

const TokenListSkeleton = () => (
  <>
    {times(4).map((i: Key) => (
      <div key={i} className="col-span-2 space-y-2">
        <div className="bg-gray-200 p-3 rounded-lg flex justify-between items-center">
          <div className="flex w-1/2 space-x-2 items-center">
            <Skeleton
              className="rounded-full w-7 h-7"
              defaultSize={false}
              defaultRounding={false}
            />
            <Skeleton className="w-1/3" />
          </div>
          <Skeleton className="w-1/3" />
        </div>
      </div>
    ))}
  </>
)

export default AccountTokenList
