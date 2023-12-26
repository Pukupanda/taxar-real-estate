"use client";

import { create } from "zustand";
import {
  FooterAddressApi,
  ProjectDetailsApi,
  ProjectListApi,
  blogsDetailApi,
  blogsListApi,
  bookingsListApi,
  careerListApi,
  getAboutApi,
  getDetailApi,
  getprivacyPolicyApi,
  gettermAndConditionApi,
  homeScreenApi,
  likedPropertyApi,
  propertyDetailApi,
  propertyFeatureListApi,
  propertyListApi,
  teamsListApi,
  userPropertyListApi,
} from "../apiCall";

export const useDataStore = create((set) => ({
  getDetail: {},
  fetchgetDetail: async (data) => {
    const res = await getDetailApi(data);
    set({ getDetail: await res?.data });
  },

  propertyList: {},
  propertyDetail: {},

  fetchpropertyList: async (data) => {
    const res = await propertyListApi(data);
    set({ propertyList: await res?.data });
  },
  fetchPropertyDetail: async (data) => {
    const res = await propertyDetailApi(data);
    set({ propertyDetail: await res?.data });
  },

  bookingsList: {},
  fetchbookingsList: async (data) => {
    const res = await bookingsListApi(data);
    set({ bookingsList: await res?.data });
  },

  userPropertyList: {},
  fetchUserPropertyList: async (data) => {
    const res = await userPropertyListApi(data);
    set({ userPropertyList: await res?.data });
  },

  likedProperty: {},
  fetchlikedProperty: async (data) => {
    const res = await likedPropertyApi(data);
    set({ likedProperty: await res?.data });
  },

  teamsList: {},
  fetchteamsList: async (data) => {
    const res = await teamsListApi(data);
    set({ teamsList: await res?.data });
  },

  ProjectList: {},
  ProjectDetails: {},
  fetchProjectList: async (data) => {
    const res = await ProjectListApi(data);
    set({ ProjectList: await res?.data });
  },
  fetchProjectDetails: async (id, data) => {
    const res = await ProjectDetailsApi(id, data);
    set({ ProjectDetails: await res?.data });
  },

  blogsList: {},
  BlogDetails: {},
  fetchblogsList: async (data) => {
    const res = await blogsListApi(data);
    set({ blogsList: await res?.data });
  },
  fetchBlogDetails: async (data) => {
    const res = await blogsDetailApi(data);
    set({ BlogDetails: await res?.data });
  },

  careerList: {},
  fetchcareerList: async (data) => {
    const res = await careerListApi(data);
    set({ careerList: await res?.data });
  },

  homeScreen: {},
  fetchhomeScreen: async (data) => {
    const res = await homeScreenApi(data);
    set({ homeScreen: await res?.data });
  },

  FooterAddress: {},
  fetchFooterAddress: async (data) => {
    const res = await FooterAddressApi(data);
    set({ FooterAddress: await res?.data });
  },

  propertyFeatureList: {},
  fetchpropertyFeatureList: async (data) => {
    const res = await propertyFeatureListApi(data);
    set({ propertyFeatureList: await res?.data });
  },

  about: {},
  termCondition: {},
  privacyPolicy: {},
  fetchAbout: async (data) => {
    const res = await getAboutApi(data);
    set({ about: await res?.data });
  },
  fetchprivacyPolicy: async (data) => {
    const res = await getprivacyPolicyApi(data);
    set({ privacyPolicy: await res?.data });
  },
  fetchtermCondition: async (data) => {
    const res = await gettermAndConditionApi(data);
    set({ termCondition: await res?.data });
  },
}));
