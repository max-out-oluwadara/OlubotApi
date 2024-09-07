import { Router, Request, Response } from 'express';

// import { twitterClient } from '../services/twitterService';
import { Mention } from '../models/mention.model';
// Remove ResponseModel import if it's not being used
// import { Response as ResponseModel } from '../models/response.model';

const mentionRoute = Router();

// Endpoint to respond to mentions
mentionRoute.post('/', async (req: Request, res: Response) => {
  try {
    const { mentionId } = req.body; // Removed 'content' as it's not used
    const mention = await Mention.findById(mentionId);

    if (!mention) {
      return res.status(404).send('Mention not found');
    }

    // Uncomment and implement the response logic if needed
    /*
    const response = await twitterClient.v2.reply(content, mention.tweetId);
    const newResponse = new ResponseModel({ mentionId, content: response.data.text });
    await newResponse.save();
    return res.status(201).send(newResponse); 
    */

    // Temporary response until you handle the response logic
    return res
      .status(200)
      .send('Mention found, but response logic not implemented');
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Add more response-related routes here if needed

export { mentionRoute };
