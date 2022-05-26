import {useMutation, useQuery} from '@apollo/client';
import React, {useCallback, useRef, useState} from 'react';

import {DELETE_FOOD, UPDATE_FOOD} from '@services/mutations/food';
import {LOAD_FOOD, LOAD_FOOD_DATA} from '@services/queries/food';
import {DetailProps} from './Detail';
import DetailPresenter from './DetailPresenter';

const DetailContainer = ({navigation, route}: DetailProps) => {
  const [cacheConsumed, setCacheConsumed] = useState<boolean>(false);
  const [cacheOnlyMe, setCacheOnlyMe] = useState<boolean>(false);
  const [consumed, setConsumed] = useState<boolean>(false);
  const [onlyMe, setOnlyMe] = useState<boolean>(false);
  const [me, setMe] = useState<number>(0);
  const toastRef = useRef<any>(null);
  const goToBack = () => {
    navigation.goBack();
  };
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  const handleUpdate = () => {
    if (cacheConsumed === consumed && cacheOnlyMe === onlyMe) {
      showToast('값이 동일합니다.');
    } else {
      // 여기서 뮤테이션 실행
      mutationUpdateFood({
        variables: {
          food: {
            no: me,
            onlyMe: onlyMe,
            consumed: consumed,
          },
        },
      });
    }
  };

  const handleDelete = () => {
    mutationDeleteFood({
      variables: {
        foodNo: me,
      },
    });
  };

  const {data} = useQuery(LOAD_FOOD_DATA, {
    variables: {
      foodNo: route?.params.no,
    },
    onCompleted: d => {
      setMe(d?.loadFoodData?.no);
      setConsumed(d?.loadFoodData?.consumed);
      setOnlyMe(d?.loadFoodData?.onlyMe);
      setCacheConsumed(d?.loadFoodData?.consumed);
      setCacheOnlyMe(d?.loadFoodData?.onlyMe);
    },
  });

  const [mutationUpdateFood] = useMutation(UPDATE_FOOD, {
    onCompleted: () => {
      showToast('수정이 완료되었습니다.');
    },
    update(cache) {
      let dataFoodQuery = cache.readQuery<any>({
        query: LOAD_FOOD_DATA,
        variables: {
          foodNo: route?.params.no,
        },
      });
      cache.writeQuery({
        query: LOAD_FOOD_DATA,
        variables: {
          foodNo: route?.params.no,
        },
        data: {
          loadFoodData: {
            __typename: 'Food',
            no: dataFoodQuery.loadFoodData.no,
            name: dataFoodQuery.loadFoodData.name,
            category: dataFoodQuery.loadFoodData.category,
            categoryColor: dataFoodQuery.loadFoodData.categoryColor,
            keyword: dataFoodQuery.loadFoodData.keyword,
            dday: dataFoodQuery.loadFoodData.dday,
            updatedAt: dataFoodQuery.loadFoodData.updatedAt,
            createdAt: dataFoodQuery.loadFoodData.createdAt,
            onlyMe,
            consumed,
          },
        },
      });

      // let dataFoodQuery2 = cache.readQuery<any>({
      //   query: LOAD_FOOD,
      //   variables: {
      //     userNo: 1,
      //   },
      // });
      cache.writeQuery({
        query: LOAD_FOOD,
        variables: {
          userNo: 1,
        },
        data: {
          loadFood: [],
        },
      });
    },
  });
  const [mutationDeleteFood] = useMutation(DELETE_FOOD);

  return (
    <DetailPresenter
      goToBack={goToBack}
      data={data?.loadFoodData}
      consumed={consumed}
      setConsumed={setConsumed}
      setOnlyMe={setOnlyMe}
      onlyMe={onlyMe}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      toastRef={toastRef}
    />
  );
};

export default DetailContainer;
