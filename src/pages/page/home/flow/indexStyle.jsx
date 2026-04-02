import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

const style = styled.div`
  .flow-container {
    position: relative;
  }
  .flow-image {
    width: 50vw;
  }
  .flow-box {
    position: absolute;
    max-width: 245px;
    min-width: 130px;
    width: 12.5vw;
    max-height: 100px;
    min-height: 65px;
    height: 6vw;
    background: ${hexToRgba(color.darkerBlue, 0.6)};
    border-radius: 16px;
    padding: 12px;
    text-align: center;
    box-shadow: 0px 0px 10px 2px ${hexToRgba(color.black, 0.25)};
    overflow: hidden;
    cursor: pointer;
  }
  .gridP {
    top: 8.5%;
    left: 13%;
    z-index: 1;
  }
  .solarP,
  .chargerP,
  .batteryP,
  .loadP {
    right: 0;
  }
  .solarP {
    top: 76.5%;
  }
  .chargerP {
    top: 53%;
  }
  .batteryP {
    top: 30%;
  }
  .loadP {
    top: 7%;
  }

  .flowing-image {
    position: absolute;
  }
  .gridP_flowing {
    max-width: 131px;
    width: 14.5%;
    left: 13.5%;
    top: 44.25%;
  }

  .solarP_flowing {
    max-width: 103px;
    width: 11.7%;
    bottom: 15.5%;
    left: 6.3%;
  }
  .chargerP_flowing {
    max-width: 87px;
    left: 30.7%;
    top: 39.1%;
    z-index: 0;
    width: 9.5%;
  }
  .loadP_flowing {
    max-width: 92px;
    left: 41.8%;
    top: 21.7%;
    z-index: 0;
    width: 10%;
  }
  .batteryP_flowing {
    max-width: 105px;
    left: 18.7%;
    top: 57.1%;
    z-index: 0;
    width: 11.8%;
  }

  .noData-image {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
  }

  @media (max-width: 1200px) {
    .gridP_flowing {
      max-width: 152px;
      width: 14.5%;
      top: 44.5%;
    }
    .chargerP_flowing {
      top: 39.3%;
    }
    .solarP_flowing {
      max-width: 141px;
      bottom: 15%;
    }
    .chargerP_flowing {
      max-width: 155px;
    }
    .batteryP_flowing {
      max-width: 138px;
      top: 57.3%;
    }
    .loadP_flowing {
      max-width: 108px;
      top: 21.8%;
    }
  }

  @media (max-width: 578px) {
    .solarP_flowing {
      bottom: 16.3%;
    }
    .chargerP_flowing {
      top: 38.8%;
    }
    .gridP_flowing {
      top: 44%;
    }
    .batteryP_flowing {
      top: 56.8%;
    }
    .loadP_flowing {
      top: 21.4%;
    }
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    .flow-box {
      width: 19vw;
      height: 12vw;
    }
  }
`;

export default style;
