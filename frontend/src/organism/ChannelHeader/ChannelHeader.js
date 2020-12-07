import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import Icon from '../../atom/Icon'
import { ADDUSER, INFOCIRCLE } from '../../constant/icon'
import ChannelCard from '../../atom/ChannelCard'
import ChannelStarBtn from '../../atom/ChannelStarBtn'
import ChannelPinBtn from '../../atom/ChannelPinBtn'
import ChannelTopicBtn from '../../atom/ChannelTopicBtn'
import ChannelMemberThumbnail from '../../atom/ChannelMemberThumbnail'
import { modalAtom } from '../../store'
import { useRecoilState } from 'recoil'
import InviteUserToChannelModal from '../InviteUserToChannelModal'
import useCurrentChannelInfo from '../../hooks/useCurrentChannelInfo'
import { COLOR } from '../../constant/style'

function ChannelHeader(props) {
  const { channelId } = props.match.params
  const [channelInfo, setChannelInfo] = useCurrentChannelInfo()
  const [modal, setModal] = useRecoilState(modalAtom)

  useEffect(() => {
    setChannelInfo(channelId)
  }, [channelId])

  const openAddUserModal = () => {
    setModal(<InviteUserToChannelModal handleClose={() => setModal(null)} />)
  }

  return Object.keys(channelInfo).length !== 0 ? (
    <ChannelHeaderStyle>
      <ChannelInfo>
        <MainInfo>
          <ChannelCard
            channel={channelInfo.channelId}
            color={COLOR.LABEL_SELECT_TEXT}
            member={channelInfo.member}
          />
          <ChannelStarBtn channel={channelInfo} {...props} />
        </MainInfo>
        <SubInfo>
          {channelInfo.pinnedCount !== 2 && (
            <>
              <ChannelPinBtn count={channelInfo.pinnedCount} />
              <Divider>|</Divider>
            </>
          )}
          <ChannelTopicBtn topic={channelInfo.channelId.topic} />
        </SubInfo>
      </ChannelInfo>
      <ChannelButtonArea>
        <ChannelMemberInfo color={COLOR.LABEL_SELECT_SUB_TEXT}>
          <ChannelMemberThumbnail
            member={channelInfo.member}
            memberNum={channelInfo.member.length}
          />
        </ChannelMemberInfo>
        <ChannelOption>
          <IconBtn onClick={openAddUserModal}>
            <Icon icon={ADDUSER} color={COLOR.LABEL_SELECT_SUB_TEXT} />
          </IconBtn>
          <IconBtn>
            <Icon icon={INFOCIRCLE} color={COLOR.LABEL_SELECT_SUB_TEXT} />
          </IconBtn>
        </ChannelOption>
      </ChannelButtonArea>
    </ChannelHeaderStyle>
  ) : (
    <div></div>
  )
}

const ChannelHeaderStyle = styled.div`
  width: 100%;
  height: auto;
  margin: auto 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const ChannelInfo = styled.div`
  height: 100%;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const MainInfo = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;
`

const SubInfo = styled.div`
  width: 100%;
  height: 100%;
  color: ${COLOR.LABEL_SELECT_SUB_TEXT};
  font-size: 13px;
  display: flex;
  flex-direction: row;

  cursor: pointer;
`

const Divider = styled.div`
  margin: 0 10px;
`

const ChannelButtonArea = styled.div`
  width: 155px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ChannelMemberInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${({ color }) => color};
  cursor: pointer;
`

const ChannelOption = styled.div`
  display: flex;
  flex-direction: row;
`

const IconBtn = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: rgba(155, 155, 155, 0.2);
  }
`

export default ChannelHeader
