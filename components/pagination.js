import Link from 'next/link'
export default function Pagination() {
   
    
    
    return (
      <>
        <ul className='pagination'>
            <li>
                <button>
                    <img src='/images/angle-left.svg' alt=''/>
                </button>
            </li>
            <li>
                <button>1</button>
            </li>
            <li>
                <button>2</button>
            </li>
            <li>
                <button>
                    <img src='/images/angle-right.svg' alt=''/>
                </button>
            </li>
        </ul>
      </>
    );
}