function OrderDetailPage({}) {
  const { id } = useParams();

  return (
    <div>
      <h1>Order Detail Page</h1>
      <p>Order ID: {id}</p>
    </div>

  )

}

export default OrderDetailPage;
