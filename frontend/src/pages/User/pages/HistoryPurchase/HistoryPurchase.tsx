import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Helmet } from 'react-helmet'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchases'
import useQueryParams from 'src/hooks/useQueryParams'
import { IPurchaseListStatus } from 'src/types/purchases.type'
import { formatCurrency } from 'src/utils/utils'
import { v4 as uuidv4 } from 'uuid'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]

const HistoryPurchase = () => {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchasesInCart } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchasesApi.getPurchasesList({ status: (status as IPurchaseListStatus) || purchasesStatus.inCart })
  })

  return (
    <div>
      <Helmet>
        <title>Đơn mua</title>
        <meta name='description' content='Đơn mua' />
      </Helmet>
      <div className='overflow-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
            {purchaseTabs.map((tab) => (
              <Link
                key={uuidv4()}
                to={{
                  pathname: path.historyPurchase,
                  search: createSearchParams({
                    status: String(tab.status)
                  }).toString()
                }}
                className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
                  'border-b-orange text-orange': status === tab.status,
                  'border-b-black/10 text-gray-900': status !== tab.status
                })}
              >
                {tab.name}
              </Link>
            ))}
          </div>
          <div>
            {purchasesInCart?.data?.data?.map((purchases) => (
              <div key={uuidv4()} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link to={`${path.home}${purchases.product._id}`} className='flex'>
                  <div className='flex-shrink-0'>
                    <img src={purchases.product.image} className='h-20 w-20 flex-shrink-0' alt='' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchases.product.name}</div>
                    <div className='mt-3'>x{purchases.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchases.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchases.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formatCurrency(purchases.product.price * purchases.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPurchase
