import React from "react";
import Box from "../box/box.component";
import { ComponentStory } from "@storybook/react";
import { LoaderSpinner } from "."

export const DefaultStory: ComponentStory<typeof LoaderSpinner> = () => (
  <LoaderSpinner motion={false}  />
);

export const Sizes: ComponentStory<typeof LoaderSpinner> = () => {
    return (
      <Box display="flex" alignItems="baseline">
        {(["XS", "S", "M", "L", "XL"] as const).map((size) => (
          <LoaderSpinner motion={false} key={size} size={size} />
        ))}
      </Box>
    );
  };

  export const Colors: ComponentStory<typeof LoaderSpinner> = () => 
    <Box display="flex">
      <LoaderSpinner color="action" />
      <LoaderSpinner color="neutral" />
      <Box backgroundColor="black">
      <LoaderSpinner color="inverse" />
      </Box>
      <Box backgroundColor="lightgrey">
      <LoaderSpinner color="gradient" />
      </Box>
      </Box>
;
  
  export const Motion: ComponentStory<typeof LoaderSpinner> = () => (
    <LoaderSpinner motion={false} />
  );

  export const Tracked: ComponentStory<typeof LoaderSpinner> = () => (
    <LoaderSpinner tracked={true} />
  );

  export const AnimationTime: ComponentStory<typeof LoaderSpinner> = () => (
  <Box display="flex">
    <LoaderSpinner animationTime={5} />
    <LoaderSpinner tracked={true} animationTime={5} />
    </Box>
  );