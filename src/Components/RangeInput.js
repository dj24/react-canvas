import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from '@chakra-ui/react'
import {useState} from "react";

const RangeInput = ({value, ...props}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  console.log({props})
  return (
    <Slider
      {...props}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
        <Tooltip
          hasArrow
          placement='top'
          isOpen={showTooltip}
          label={value}
        >
            <SliderThumb />
        </Tooltip>
    </Slider>
  );
}

export default RangeInput;