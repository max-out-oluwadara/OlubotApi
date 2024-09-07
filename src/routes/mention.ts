import { Router, Request, Response } from 'express';

//import { twitterClient } from '../services/twitterService';
import { Mention } from '../models/mention.model';
import { Response as ResponseModel } from '../models/response.model';

const mentionRoute = Router();

// Endpoint to respond to mentions
mentionRoute.post('/', async (req: Request, res: Response) => {
  try {
    const { mentionId, content } = req.body;
    const mention = await Mention.findById(mentionId);
    if (!mention) {
      return res.status(404).send('Mention not found');
    }
    //const response = await twitterClient.v2.reply(content, mention.tweetId);
    //const newResponse = new ResponseModel({ mentionId, content: response.data.text });
    //await newResponse.save();
    //res.status(201).send(newResponse);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add more response-related routes here if needed

export { mentionRoute };
