'use client';
import { useState, useEffect } from 'react';
import { addToCart, getEventsProducts } from '../../../lib/woredpressApi';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import CustomToast from '../../components/event&webinar/CustomToast'
import { useRouter } from 'next/navigation';
import Spinner from '../micro/spinner/Spinner';



export default function TicketBooking({ initialQuantity = 1, event }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAdding, setIsAdding] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getEventsProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  const getProductId = () => {
    if (!event || !event.title) return null;

    const matchedProduct = products.find(
      (product) => product.name.toLowerCase() === event.title.toLowerCase()
    );
    return matchedProduct ? matchedProduct.id : null;
  };

  const increment = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decrement = () => setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const ticketPrice = parseFloat(event.meta.evotx_price) || 0;
  const totalPrice = (ticketPrice * quantity).toFixed(2);

  const slug = window.location.pathname;

  const handleAddToCart = async () => {
    setIsAdding(true);
    const productId = getProductId();
    if (!productId) {
      alert("Product not found");
      setError('Product not found.');
      setIsAdding(false);
      return;
    }

    const token = localStorage.getItem("token"); // Get token from localStorage
    const crossSells = []; // Handle cross-sells if you have this logic for events
    const slug = window.location.pathname; // Current slug of the event page

    // If user is not logged in (no token)
    if (!token) {
      let events = JSON.parse(localStorage.getItem("courses")) || []; // Reusing 'courses' key for storing events
      const index = events.findIndex(eventItem => eventItem.id === productId);

      if (index !== -1) {
        // If the event is already in the cart, update its quantity
        events[index].quantity += quantity;
        events[index].price = (parseFloat(ticketPrice) * events[index].quantity).toFixed(2);
      } else {
        // If the event is not in the cart, add it as a new entry
        events.push({
          id: productId,
          package: `${event.title}`,
          quantity: quantity,
          price: ticketPrice.toString(),
          imgUrl: event.featured_image || "https://via.placeholder.com/150/808080/808080",
          slug: slug,
          crossSells: crossSells
        });
      }

      // Update localStorage
      localStorage.setItem("courses", JSON.stringify(events));

      // Show success message and redirect to cart
      setToastMessage(
        <div className=' flex flex-col'>
          <div className='flex p-5 gap-4 justify-center items-center flex-col'>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-[50px] w-[50px]'>
              <circle cx="256" cy="256" r="256" fill="green" />

              <path d="M369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" fill="white" />
            </svg>





            <p className="text-gray-800 font-semibold mb-2 text-center">
              Your item has been successfully added to the cart!
            </p>
          </div>
          <div className="flex gap-5 justify-center items-center mt-4">
            <Link href="/cart" className="text-white font-bold bg-blue-600 hover:bg-blue-700 hover:text-black duration-300 px-4 py-2 rounded-lg shadow-sm">
              View Cart
            </Link>
            {/* <Link href="/checkout" className="text-white bg-green-600 font-bold hover:bg-green-700 hover:text-black duration-300 px-4 py-2 rounded-lg shadow-sm">
            Go to Checkout
          </Link> */}
          </div>
        </div>
      )
      router.push("/cart");

      setIsAdding(false); // Reset loading state
      return; // Stop execution for guest user
    }
    try {
      const response = await addToCart(productId.toString(), quantity.toString(), slug);
      if (response) {
        setToastMessage(
          <div className=' flex flex-col'>
            <div className='flex p-5 gap-4 justify-center items-center flex-col'>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-[50px] w-[50px]'>
                <circle cx="256" cy="256" r="256" fill="green" />

                <path d="M369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" fill="white" />
              </svg>





              <p className="text-gray-800 font-semibold mb-2 text-center">
                Your item has been successfully added to the cart!
              </p>
            </div>
            <div className="flex gap-5 justify-center items-center mt-4">
              <Link href="/cart" className="text-white font-bold bg-blue-600 hover:bg-blue-700 hover:text-black duration-300 px-4 py-2 rounded-lg shadow-sm">
                View Cart
              </Link>
              {/* <Link href="/checkout" className="text-white bg-green-600 font-bold hover:bg-green-700 hover:text-black duration-300 px-4 py-2 rounded-lg shadow-sm">
                Go to Checkout
              </Link> */}
            </div>
          </div>
        );
        router.push({ pathname: '/cart', query: { redirectUrl } });
      } else {
        console.error('Failed to add item to cart:', response);
      }
    } catch (error) {
      setError('Error adding product to cart.');
    } finally {
      setIsAdding(false);
    }
  };

  // Function to create and download ICS file old working code 
  // const downloadICSFile = () => {
  //   const formatToICSDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  //   };

  //   const eventId = event.id;
  //   const startFullDate = event.meta.evcal_srow[0] * 1000; // Convert Unix timestamp to milliseconds
  //   const endFullDate = event.meta.evcal_erow[0] * 1000;

  //   // Convert start and end dates to UTC format
  //   const startUTC = formatToICSDate(new Date(startFullDate));
  //   const endUTC = formatToICSDate(new Date(endFullDate));

  //   const icsDownloadURL = `https://aroramedicaleducation.co.uk/wp-admin/admin-ajax.php?action=eventon_ics_download&event_id=${eventId}&sunix=${startUTC}&eunix=${endUTC}&loca=&locn=`;

  //   const link = document.createElement('a');
  //   link.href = icsDownloadURL;
  //   link.download = `${event.title}.ics`; 
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link); 
  // };


  // const startDateString =event.start_date 

  // const endDateString = event.end_date;

  // new code for ics file start
  const downloadICSFile = () => {
    const formatToICSDateFloating = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0]; // No 'Z' at the end (no UTC conversion)
    };

    const eventId = event.id;

    // Convert Unix timestamp to milliseconds and subtract 1 hour (3600000 milliseconds)
    const startFullDate = event.meta.evcal_srow[0] * 1000 - 3600000; // Subtract 1 hour
    const endFullDate = event.meta.evcal_erow[0] * 1000 - 3600000; // Subtract 1 hour

    // Convert start and end dates without time zone conversion (floating time)
    const startLocal = formatToICSDateFloating(new Date(startFullDate));
    const endLocal = formatToICSDateFloating(new Date(endFullDate));

    // Construct the ICS URL for download
    const icsDownloadURL = `https://aroramedicaleducation.co.uk/wp-admin/admin-ajax.php?action=eventon_ics_download&event_id=${eventId}&sunix=${startLocal}&eunix=${endLocal}&loca=&locn=`;

    // Trigger the download of the ICS file
    const link = document.createElement('a');
    link.href = icsDownloadURL;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // new code for ics file end


  const startDateString = event.start_date;
  const endDateString = event.end_date;


  return (
    <div className='w-full flex flex-col gap-0 justify-start'>
      <div className='flex justify-between items-center pb-2 lg:pb-1 xl:pb-[14px]'>
        <h3 className='text-[20px] lg:text-[18px]  xl:text-[25px] leading-[25px] text-black font-bold'>Time</h3>
        <div className='group relative'>
          <span className='hidden xl:group-hover:block absolute top-[-45px] left-[-40px] text-white font-bold px-5 py-1 bg-[#079561] rounded-[20px]  justify-center items-center'>Calendar</span>
          {/* CALENDER SVG START*/}

          <svg
            onClick={downloadICSFile}
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-[#8C8C8C] hover:text-[#079561] cursor-pointer'
          >
            <path
              d='M27.2 3.2H24V1.6C24 1.17565 23.8314 0.768687 23.5314 0.468629C23.2313 0.168571 22.8243 0 22.4 0C21.9757 0 21.5687 0.168571 21.2686 0.468629C20.9686 0.768687 20.8 1.17565 20.8 1.6V3.2H11.2V1.6C11.2 1.17565 11.0314 0.768687 10.7314 0.468629C10.4313 0.168571 10.0243 0 9.6 0C9.17565 0 8.76869 0.168571 8.46863 0.468629C8.16857 0.768687 8 1.17565 8 1.6V3.2H4.8C3.52696 3.2 2.30606 3.70571 1.40589 4.60589C0.505713 5.50606 0 6.72696 0 8V27.2C0 28.473 0.505713 29.6939 1.40589 30.5941C2.30606 31.4943 3.52696 32 4.8 32H27.2C28.473 32 29.6939 31.4943 30.5941 30.5941C31.4943 29.6939 32 28.473 32 27.2V8C32 6.72696 31.4943 5.50606 30.5941 4.60589C29.6939 3.70571 28.473 3.2 27.2 3.2ZM28.8 27.2C28.8 27.6243 28.6314 28.0313 28.3314 28.3314C28.0313 28.6314 27.6243 28.8 27.2 28.8H4.8C4.37565 28.8 3.96869 28.6314 3.66863 28.3314C3.36857 28.0313 3.2 27.6243 3.2 27.2V16H28.8V27.2ZM28.8 12.8H3.2V8C3.2 7.57565 3.36857 7.16869 3.66863 6.86863C3.96869 6.56857 4.37565 6.4 4.8 6.4H8V8C8 8.42435 8.16857 8.83131 8.46863 9.13137C8.76869 9.43143 9.17565 9.6 9.6 9.6C10.0243 9.6 10.4313 9.43143 10.7314 9.13137C11.0314 8.83131 11.2 8.42435 11.2 8V6.4H20.8V8C20.8 8.42435 20.9686 8.83131 21.2686 9.13137C21.5687 9.43143 21.9757 9.6 22.4 9.6C22.8243 9.6 23.2313 9.43143 23.5314 9.13137C23.8314 8.83131 24 8.42435 24 8V6.4H27.2C27.6243 6.4 28.0313 6.56857 28.3314 6.86863C28.6314 7.16869 28.8 7.57565 28.8 8V12.8Z'
              fill='currentColor'
            />
            <rect x='7' y='18' width='4' height='4' fill='currentColor' />
            <rect x='7' y='23' width='4' height='4' fill='currentColor' />
            <rect x='12' y='18' width='4' height='4' fill='currentColor' />
            <rect x='12' y='23' width='4' height='4' fill='currentColor' />
            <rect x='17' y='18' width='4' height='4' fill='currentColor' />
            <rect x='17' y='23' width='4' height='4' fill='currentColor' />
            <rect x='22' y='18' width='4' height='4' fill='currentColor' />
            <rect x='22' y='23' width='4' height='4' fill='currentColor' />
          </svg>
        </div>
        {/* CALENDER SVG END */}
      </div>
      <div className='border-b-[1px] border-[#B2B4B6] w-full pb-2 lg:pb-1 xl:pb-[14px]'>
        <p className='text-[14px] lg:text-[14px] xl:text-[18px] leading-[30px] text-[#5C5C5C]'>
          {/* {event.$start_time} - ({event.end_date_month.month} {event.end_date_month.day}) {event.$end_time} */}
          {/* ({startDateString.split('-')[2]} {startWeekday}) {event.$start_time} -  ({event.end_date_month.day} {endWeekday}) {event.$end_time} */}
          {startDateString} {event.$start_time}-{endDateString} {event.$end_time}
        </p>
      </div>
      <div className='border-b-[1px] border-[#B2B4B6] w-full pb-3 lg:pb-2 xl:pb-3 '>
        <h3 className=' text-[20px] lg:text-[18px]  xl:text-[25px] leading-[25px] text-black font-bold py-5 lg:py-2 xl:py-[14px]'>Ticket Section Title</h3>
        <div className='flex justify-between'>
          <p className='text-[14px] lg:text-[14px] xl:text-[18px] leading-[30px] text-[#5C5C5C]'>Price</p>
          <div className='flex gap-5 pb-1 xl:pb-[19px]'>
            {ticketPrice === 0 ? (
              <span className=' lg:text-[18px]  xl:text-[25px] leading-[34px] font-bold text-[#079561]'>Free</span>
            ) : (
              <span className=' lg:text-[18px]  xl:text-[25px] leading-[34px] font-bold text-[#079561]'>£{totalPrice}</span>
            )}
          </div>
        </div>
        <div className=' flex justify-between'>
          <p className='text-[14px] lg:text-[14px] xl:text-[18px] text-[#5C5C5C]'>How many tickets?</p>
          <div className='flex items-center border border-gray-300 rounded-full py-[6px] xl:py-3 px-5'>
            <button onClick={decrement} className='px-3 py-1 text-xl font-bold text-gray-600 hover:text-black'>
              −
            </button>
            <div className='px-4 py-1 text-lg font-semibold'>{quantity}</div>
            <button onClick={increment} className='px-3 py-1 text-xl font-bold text-gray-600 hover:text-black'>
              +
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-1 xl:mt-2 items-center'>
        <span className=' !text-[20px] lg:text-[14px] xl:text-[25px] leading-[34px] text-black font-bold py-[14px]'>Total</span>

        <div className='flex gap-5 pb-[8px] xl:pb-[19px]'>

          <span className=' text-[25px] lg:text-[25px] xl:text-[38px] leading-[34px] font-bold text-[#079561]'>£{totalPrice}</span>

        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className={`text-white w-full bg-[#079561] flex justify-center items-center text-[18px] font-bold rounded-[66px] py-2 xl:py-[20px] leading-[28px] ${isAdding ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={isAdding}
      >
        {isAdding ? <Spinner /> : 'Add to Cart'}
      </button>

      <CustomToast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
