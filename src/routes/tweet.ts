import { Router, Request, Response } from 'express';

//import { twitterClient } from '../services/twitterService';
import { Tweet } from '../models/tweet.model';

const tweetRoute = Router();

// Endpoint to post a tweet
tweetRoute.post('/', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    //const tweet = await twitterClient.v2.tweet(content);
    //const newTweet = new Tweet({ content: tweet.data.text });
    // await newTweet.save();
    //res.status(201).send(newTweet);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add more tweet-related routes here if needed

export { tweetRoute };
