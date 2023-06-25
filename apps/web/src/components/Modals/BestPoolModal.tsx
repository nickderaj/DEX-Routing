import { getBestRoute } from '@/api/dex.api';
import { useState } from 'react';
import { Button, Dropdown, Modal } from 'ui';

type Props = {
  token: string;
  tokens: string[];
  onClose: () => void;
};

const BestPoolModal: React.FC<Props> = ({ token, tokens, onClose }) => {
  const [selected, setSelected] = useState<string>(tokens[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<number | '?'>('?');

  const handleChange = (newToken: string) => {
    setPrice('?');
    setSelected(newToken);
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await getBestRoute(token, selected);
      setPrice(res.data.estimatedReturn);
      // TODO: disable this when going live, just to simulate loading time
      setTimeout(() => setIsLoading(false), 800);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const roundNum = (num: number | '?') => {
    if (num === '?') return num;
    const numString = num.toString();
    const numLength = numString.length;

    if (numLength > 10) return numString.slice(0, 10);
    return num;
  };

  return (
    <Modal title={token} onClose={onClose} isOpen={token !== ''} isLoading={isLoading}>
      <div className="px-6 pb-6">
        <p className="mb-4">Select a token to calculate the current best price:</p>
        <Dropdown value={selected} setValue={handleChange} options={tokens} />
        <div className="flex justify-center items-center gap-2 mt-4">
          <p>
            1 {token} : {roundNum(price)} {selected}
          </p>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button className="mt-4" onClick={handleClick}>
            GET PRICE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BestPoolModal;
