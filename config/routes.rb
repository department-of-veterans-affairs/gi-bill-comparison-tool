# frozen_string_literal: true
Rails.application.routes.draw do
  root 'institutions#home'

  get 'institutions/profile' => 'institutions#profile', as: :profile
  get 'institutions/autocomplete' => 'institutions#autocomplete', as: :autocomplete
  get 'institutions/search' => 'institutions#search', as: :search_page
end
