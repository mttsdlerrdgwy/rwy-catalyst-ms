import { useFormatter } from 'next-intl';

import { ResultOf } from '~/client/graphql';
import { ProductCard as ComponentProductCard } from '~/components/ui/product-card/product-card';
import { pricesTransformer } from '~/data-transformers/prices-transformer';

import { AddToCart } from '../../app/[locale]/(default)/compare/_components/add-to-cart';

import { ProductCardFragment } from './fragment';

interface Props {
  product: ResultOf<typeof ProductCardFragment>;
  imageSize?: 'tall' | 'wide' | 'square';
  imagePriority?: boolean;
  showCompare?: boolean;
  showCart?: boolean;
}

export const ProductCard = ({
  product,
  imageSize = 'square',
  imagePriority = false,
  showCart = true,
  showCompare = true,
}: Props) => {
  const format = useFormatter();

  const { name, entityId, defaultImage, brand, path, prices } = product;

  const price = pricesTransformer(prices, format);

  return (
    <ComponentProductCard
      addToCart={
        showCart && (
          <AddToCart
            data={{
              ...product,
              inventory: product.inventory,
              availabilityV2: product.availabilityV2,
            }}
          />
        )
      }
      addToCart={
        showCart && (
          <AddToCart
            data={{
              ...product,
              inventory: product.inventory,
              availabilityV2: product.availabilityV2,
            }}
          />
        )
      }
      averageRating={product.reviewSummary.averageRating}
      id={entityId.toString()}
      image={defaultImage ? { src: defaultImage.url, altText: defaultImage.altText } : undefined}
      imagePriority={imagePriority}
      imageSize={imageSize}
      name={name}
      numberOfReviews={product.reviewSummary.numberOfReviews}
      price={price}
      showCompare={showCompare}
      subtitle={brand?.name}
    />
  );
};
