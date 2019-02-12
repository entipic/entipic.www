
import { Router as createRouter } from 'express';
import { maxageIndex, maxageHelp } from '../utils';
import { topicRepository, uniqueNameRepository, pictureRepository } from '../data';

const router = createRouter();

export default router;

router.get('/', async function (_req, res, next) {

	maxageIndex(res);
	try {
		const exampleTopics = await topicRepository.popularTopics({ limit: 9 });
		const latestTopics = await topicRepository.latestTopics({ limit: 12 });
		const countTopics = await topicRepository.countTotal();
		const countUniqueNames = await uniqueNameRepository.countTotal();
		const countPictures = await pictureRepository.countTotal();
		res.render('home.jade', { exampleTopics, latestTopics, countPictures, countTopics, countUniqueNames });
	} catch (e) {
		return next(e);
	}
});

router.get('/help', function (_req, res) {
	maxageHelp(res);
	res.locals.site.head.title = 'Help | ' + res.locals.site.head.title;
	res.locals.site.currentPage = 'help';
	res.render('help.jade');
});
