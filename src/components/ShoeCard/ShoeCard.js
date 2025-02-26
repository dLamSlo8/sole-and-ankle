import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';

  let variantHumanReadable;

  switch (variant) {
    case 'on-sale':
      variantHumanReadable = 'Sale';
      break;
    case 'new-release':
      variantHumanReadable = 'Just Released!';
      break;
    default: 
      variantHumanReadable = null;
      break;
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {
            variantHumanReadable && (
              <Variant>{variantHumanReadable}</Variant>
            )
          }
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  flex: 1 1 400px;
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Variant = styled.span`
  position: absolute;
  top: 1rem;
  right: -0.5rem;
  border-radius: 0.2rem;
  padding: 0.5rem 0.75rem;
  color: white;
  background-color: ${COLORS.primary}
`;

const Image = styled.img`
  max-width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
