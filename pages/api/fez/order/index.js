export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const orderData = req.body;

    const response = await fetch(`${process.env.FEZ_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Authorization': authToken,
        'secret-key': process.env.FEZ_SECRET_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('FeZ Create Order error:', error);
    res.status(500).json({ error: 'Failed to create delivery order' });
  }
}