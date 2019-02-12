import { Router as createRouter } from 'express';
import { maxageTopic } from '../utils';
import { topicRepository } from '../data';
import links from '../links';

const router = createRouter();

export default router;

router.get('/topic/:slug', async function (req, res, next) {
	const slug = req.params.slug as string;

	maxageTopic(res);

	try {
		const topic = await topicRepository.topicBySlug(slug);

		if (!topic) {
			return res.redirect(links.home());
		}


		// const uniqueNames=await uniqueNameRepository.getByIds(topic.)

		res.locals.site.head.title = topic.name + ' picture';
		res.render('topic.jade', { topic });
	} catch (e) {
		next(e);
	}
});
