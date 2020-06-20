import { getSortedPostsData } from '../lib/posts';

describe('Posts',() => {
    it('should have content', () => {
        expect(getSortedPostsData().length).toBeGreaterThan(0);
    })
})

export {}