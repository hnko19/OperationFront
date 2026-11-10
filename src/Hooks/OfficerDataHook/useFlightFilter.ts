import { useMutation } from '@tanstack/react-query';
import type {
  ITowerDataViewDomain,
  IFlightSearchRequestModel,
} from '../../Interface/IOfficerData';
import { getFlightByFilter } from '../../Api/OfficerData';

export const useFlightFilter = () => {
  return useMutation<ITowerDataViewDomain[], Error, IFlightSearchRequestModel>({
    mutationFn: (filters: IFlightSearchRequestModel) =>
      getFlightByFilter(filters),
  });
};
