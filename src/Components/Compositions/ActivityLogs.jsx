/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { Timeline } from './TimeLine';
import { Button } from '../Elements';
import EmptyState from './EmptyState';
import { utils } from '../../api/utils';

export const Group = styled.div`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const LogsWrapper = styled.div`
  padding: 2rem;
`;

export const Title = styled.p`
  color: #000;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  margin-bottom: 0.8rem;
`;

export const List = styled.div`
  display: flex;
  padding-left: 1rem;
  flex-direction: column;
`;

const LoadMoreButton = styled(Button)`
  margin: 0;
  font-size: ${(p) => p.theme.fontSizes.small};
  width: 100%;
  box-shadow: 0 0 0;
  &:hover {
    box-shadow: 0 0 0;
  }
  &:focus {
    outline: none;
  }
`;

const ActivityLogs = (props) => {
  const [logs, setLogs] = useState([]);
  const { loading_logs, meta } = props;

  const sortAllLogs = (logs) => {
    logs?.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    const sorted = logs?.reduce((accum, currentValue, index) => {
      const key = new Date(currentValue.created_at).toDateString();

      if (!accum[key]) {
        accum[key] = {
          time_difference: '',
          activityLogs: [],
        };
      }

      const currentDate = new Date().getDate();
      const currentValueDate = new Date(currentValue.created_at).getDate();
      currentValue.date_difference = currentDate - currentValueDate;

      const time = new Date(currentValue.created_at).getTime();
      const activityString = `${new Date(time).toLocaleTimeString()} ${currentValue.activity}`;

      currentValue.activityString = activityString;
      accum[key].time_difference = currentDate - currentValueDate;
      accum[key].activityLogs.push(activityString);

      return accum;
    }, {});

    setLogs(sorted);
  };

  const fetchLogs = async () => {
    try {
      const data = await utils.getUserActivity()
      sortAllLogs(data.data.data)
    }catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLogs();
    })()
  }, []);

  // useEffect(() => {
  //   sortAllLogs(props.activity_logs);
  // }, [props.activity_logs]);

  const handleLoadMore = async () => {
    await fetchLogs(meta.page + 1);
  };

  return (
    <LogsWrapper>
      {!Object.keys(logs).length ? (
        <EmptyState height="100%" text="No Logs Available" />
      ) : (
        Object.keys(logs).map((log, i) => {
          const today = new Date();
          const isToday = (today.toDateString() == new Date(log).toDateString());
          const isYesterday = (today.toDateString() == new Date(Date.now() - 864e5));
          return (
            <Group key={i}>
              <Title>
                {isToday
                  ? 'Today'
                  : isYesterday
                  ? 'Yesterday'
                  : new Date(log).toDateString()}
              </Title>

              <List>
                <Timeline steps={logs[log].activityLogs} today={logs[log].time_difference < 1} />
              </List>
            </Group>
          );
        })
      )}
      {!loading_logs && meta?.page < meta?.last_page && Boolean(Object.keys(logs).length) && (
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      )}
    </LogsWrapper>
  );
};

export default ActivityLogs;
