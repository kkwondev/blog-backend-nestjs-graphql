import { Category } from 'src/categories/entities/categories.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/users.entity';
export declare class Post extends CoreEntity {
    title: string;
    slug: string;
    content: string;
    thumbnail_img?: string;
    userId: number;
    categoryId: number;
    user: User;
    category: Category;
}
