import { useQuery } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import purchasesApi from 'src/apis/purchases.api'
import { purchasesStatus } from 'src/constants/purchases'
import { formatCurrency } from 'src/utils/utils'
import noproduct from 'src/assets/images/no-product.png'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import QuantityController from 'src/components/QuantityController/QuantityController'

const Cart = () => {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['product', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchasesList({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data?.data
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container overflow-auto '>
        <div className='min-w-[1000px]'>
          <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
            <div className='col-span-6'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input type='checkbox' className='h-5 w-5 text-orange accent-orange outline-none focus:ring-0' />
                </div>
                <div className='flex-grow text-black'>Sản phẩm</div>
              </div>
            </div>
            <div className='col-span-6'>
              <div className='grid grid-cols-5 text-center'>
                <div className='col-span-2'>Đơn giá</div>
                <div className='col-span-1'>Số lượng</div>
                <div className='col-span-1'>Số tiền</div>
                <div className='col-span-1'>Thao tác</div>
              </div>
            </div>
          </div>
          <div className='my-3 rounded-sm bg-white p-5 shadow'>
            {purchasesInCart?.map((item) => (
              <div
                key={item._id}
                className='mt-4 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
              >
                <div className='col-span-6'>
                  <div className='flex'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input type='checkbox' className='h-5 w-5 text-orange accent-orange outline-none focus:ring-0' />
                    </div>
                    <div className='flex-grow'>
                      <div className='flex'>
                        <Link to={`/${item.product._id}`} className='h-20 w-20 flex-shrink-0'>
                          <img src={item.product.image} alt={item.product.image} />
                        </Link>
                        <div className='flex-grow px-2 pb-2 pt-1'>
                          <Link to={`/${item.product._id}`} className='line-clamp-2'>
                            {item.product.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 items-center'>
                    <div className='col-span-2'>
                      <div className='flex items-center justify-center'>
                        <span className='text-gray-400 line-through'>
                          {formatCurrency(item.product.price_before_discount)}
                        </span>
                        <span className='ml-3'>{formatCurrency(item.product.price)}</span>
                      </div>
                    </div>
                    <div className='col-span-1'>
                      <QuantityController
                        max={item.product.quantity}
                        value={item.buy_count}
                        classNameWrapper='fllex items-center'
                      />
                    </div>
                    <div className='col-span-1'>
                      <span className='text-orange'>{formatCurrency(item.product.price * item.buy_count)}</span>
                    </div>
                    <div className='col-span-1'>
                      <button className='bg-none text-black transition-colors hover:text-orange '>Xoá</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* sticky khi scroll */}
      <div className='sticky bottom-0 z-10 flex flex-col rounded-sm border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
        <div className='flex items-center'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <input type='checkbox' className='h-5 w-5 text-orange accent-orange outline-none focus:ring-0' />
            <button className='mx-3 border-none bg-none'>{`Chọn tất cả (${purchasesInCart?.length})`}</button>
            <button className='mx-3 border-none bg-none'>Xoá</button>
          </div>
        </div>

        <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
          <div>
            <div className='flex items-center sm:justify-end'>
              <div>Tổng thanh toán sản phẩm:</div>
              <div className='ml-2 text-2xl text-orange'>₫{}</div>
            </div>
            <div className='flex items-center text-sm sm:justify-end'>
              <div className='text-gray-500'>Tiết kiệm</div>
              <div className='ml-6 text-orange'>₫</div>
            </div>
          </div>
          <Button
            className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
            // onClick={handleBuyPurchases}
            // disabled={buyProductsMutation.isLoading}
          >
            Mua hàng
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart