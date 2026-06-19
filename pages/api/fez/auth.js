export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${process.env.FEZ_BASE_URL}/user/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: process.env.FEZ_USER_ID,
        password: process.env.FEZ_PASSWORD
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('FeZ Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}