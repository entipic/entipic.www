import { Router as createRouter } from 'express';
import { maxageApi } from '../utils';
import { topicRepository } from '../data';
import { TopicHelper } from '@entipic/domain';

const router = createRouter();

router.delete('/api/topic/:uniqueName', async function (req, res) {
	maxageApi(res);

	const uniqueName = req.params.uniqueName.trim().toLowerCase();

	const topic = await topicRepository.topicBySlug(TopicHelper.slug(uniqueName, 'en'));
	if (!topic) {
		return res.sendStatus(404);
	}
	return res.sendStatus(200);
});

export default router;
