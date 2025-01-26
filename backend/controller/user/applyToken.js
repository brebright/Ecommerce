const applyFabricToken = require("../../service/applyFabricToken");


async function applyToken(req , res){
  try {
    const tokenResponse = await applyFabricToken();
    res.status(200).json(tokenResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply for token' });
  }
}

module.exports = applyToken;
