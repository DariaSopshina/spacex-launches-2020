import { Card, Image, Text, Button } from '@mantine/core';
import { useState } from 'react';
import type { Launch } from '../../types';

import './LaunchCard.css';

type Props = {
  launch: Launch;
  openModal: (launch: Launch) => void;
};

export function LaunchCard({ launch, openModal }: Props) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = launch.links?.mission_patch_small;

  const showFallback = !imageSrc || imageError;

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section className="launch-card__image-wrapper">
        {showFallback ? (
          <div className="launch-card__image-error">Изображение недоступно</div>
        ) : (
          <Image
            src={imageSrc}
            alt={launch.mission_name}
            height={160}
            fit="contain"
            onError={() => setImageError(true)}
          />
        )}
      </Card.Section>

      <Text fw={500} mt="sm" className="launch-card__title">
        {launch.mission_name}
      </Text>

      <Text c="dimmed" size="sm" className="launch-card__rocket">
        {launch.rocket?.rocket_name}
      </Text>

      <Button onClick={() => openModal(launch)} className="launch-card__button">
        See more
      </Button>
    </Card>
  );
}
