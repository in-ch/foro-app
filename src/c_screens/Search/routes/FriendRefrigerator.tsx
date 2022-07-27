import React from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery, useReactiveVar} from '@apollo/client';

// import SearchInput from '@components/SearchInput';
import {SizedBox} from '@components/SizedBox';
import {cWidth, nomalizes} from '@utills/constants';
import {LOAD_FRIEND_FOOD} from '@services/queries/friend';
import {tokenUserNo} from 'apollo/client';
import {cssUtil} from '@utills/cssUtil';

const Wrapper = styled.View`
  width: 90%;
  margin-left: 5%;
  margin-top: ${nomalizes[20]}px;
  min-height: ${nomalizes[40]}px;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[13]}px;
  margin-bottom: ${nomalizes[15]}px;
  color: #272727;
  font-family: 'Pretendard';
`;
const SearchResultBoxTextWrapper = styled.TouchableOpacity`
  display: flex;
  width: ${cWidth * 0.85}px;
  height: ${nomalizes[16]}px;
  margin-left: ${nomalizes[5]}px;
  margin-bottom: ${nomalizes[10]}px;
  font-family: 'Pretendard';
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SearchResultBoxText = styled.Text`
  font-size: ${nomalizes[11]}px;
  color: rgb(50, 50, 50);
  font-family: 'Pretendard';
`;
const SearchResultBoxRemainText = styled.Text`
  font-size: ${nomalizes[9]}px;
  color: rgb(109, 109, 109);
  font-family: 'Pretendard';
`;
const NoneContainer = styled.View`
  width: 100%;
  height: 250px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const NoneText = styled.Text`
  margin-top: ${nomalizes[10]}px;
  color: #a8a8a8;
  font-size: ${nomalizes[12]}px;
`;

interface Props {
  goToFriendDetail: (value: number) => void;
}
const FriendRefrigerator = ({goToFriendDetail}: Props) => {
  // const [text, setText] = useState<string>('');
  const userNo = useReactiveVar(tokenUserNo);
  const {data: friendsData} = useQuery(LOAD_FRIEND_FOOD, {
    variables: {
      userNo,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      {/* <SizedBox.Custom margin={nomalizes[30]} /> */}
      {/* <SearchInput value={text} setValue={(value: string) => setText(value)} /> */}
      <ScrollView>
        {friendsData &&
          friendsData?.loadFriendFood?.map((_friendData: any) => {
            return (
              <Wrapper>
                <Heading>{_friendData?.nickname}</Heading>

                {_friendData?.food?.map((_food: any) => {
                  return (
                    <SearchResultBoxTextWrapper
                      onPress={() => goToFriendDetail(_food?.no)}>
                      <SearchResultBoxText>{_food?.name}</SearchResultBoxText>
                      <SearchResultBoxRemainText>
                        소비날: {_food?.dday}
                      </SearchResultBoxRemainText>
                    </SearchResultBoxTextWrapper>
                  );
                })}
              </Wrapper>
            );
          })}

        {friendsData?.loadFriendFood?.length < 1 && (
          <NoneContainer>
            <NoneText>이웃이 아직 없습니다.</NoneText>
          </NoneContainer>
        )}

        <SizedBox.Custom margin={nomalizes[100]} />
      </ScrollView>
    </>
  );
};

export default FriendRefrigerator;
